/**
 * CodeDash backend — API + realtime (socket.io) server.
 *
 * The React frontend is deployed separately as a static site
 * (https://www.code-dash.net) and talks to this service at
 * https://codedashback.onrender.com. This server is API-only:
 * it does not serve HTML.
 */

const crypto = require('crypto');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Running behind Render + Cloudflare: trust the first proxy so secure
// cookies, req.ip and rate limiting see the real client.
app.set('trust proxy', 1);

app.use(helmet());
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ---------------------------------------------------------------------------
// CORS — only the CodeDash frontend may call this API from a browser.
// ---------------------------------------------------------------------------
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS ||
  'https://www.code-dash.net,https://code-dash.net')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header: curl, health checks, server-to-server.
      if (!origin) return callback(null, true);
      if (FRONTEND_ORIGINS.includes(origin)) return callback(null, true);
      if (
        process.env.NODE_ENV !== 'production' &&
        /^http:\/\/localhost:\d+$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);

// ---------------------------------------------------------------------------
// Database. MONGODB_URI is canonical; the legacy MONGOLAB_URI name still
// works as a fallback. The server stays up without a database so the
// realtime game server keeps running; DB-backed routes answer 503.
// ---------------------------------------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGOLAB_URI;

if (!MONGODB_URI) {
  console.error(
    '[db] MONGODB_URI (or legacy MONGOLAB_URI) is not set. ' +
      'Login, signup and stats will return 503 until it is configured.'
  );
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('[db] connection successful');
      return ensureDemoUsers();
    })
    .then(() => console.log('[db] demo users ready'))
    .catch((err) => console.error('[db] connection failed:', err.message));
}

mongoose.connection.on('disconnected', () =>
  console.error('[db] disconnected')
);
mongoose.connection.on('reconnected', () => console.log('[db] reconnected'));

function dbReady() {
  return mongoose.connection.readyState === 1;
}

// Liveness probe that also reports database state (no auth needed).
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    db: dbReady() ? 'connected' : 'disconnected',
    time: new Date().toISOString(),
  });
});

// Everything else under /api needs the database.
app.use('/api', (req, res, next) => {
  if (!dbReady()) {
    return res.status(503).json({
      error:
        'Database unavailable. The site owner needs to set MONGODB_URI on this service.',
    });
  }
  next();
});

// ---------------------------------------------------------------------------
// Sessions. Used for /api/current_user and /api/logout when the browser
// sends cookies. Login/signup also return the user as JSON so they work
// even for cross-origin clients that don't send cookies.
// ---------------------------------------------------------------------------
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  console.warn(
    '[session] SESSION_SECRET is not set — using an ephemeral secret. ' +
      'Set SESSION_SECRET in the environment for stable sessions across restarts.'
  );
}

app.use(
  session({
    secret: SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------
// Throttle auth endpoints against brute force.
// ---------------------------------------------------------------------------
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later.' },
});
app.use('/api/login', authLimiter);
app.use('/api/register', authLimiter);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// JSON 404 for anything unmatched.
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// JSON error handler — never leak stack traces in production.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[error]', err.message);
  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message,
  });
});

// ---------------------------------------------------------------------------
// Demo users for the splash page "Play Now" button, which logs in as
// player1..player10 with password "password". Idempotent: only missing
// users are created, and only once per successful DB connection.
// ---------------------------------------------------------------------------
async function ensureDemoUsers() {
  for (let i = 1; i <= 10; i++) {
    const username = `player${i}`;
    const exists = await User.findOne({ username }).select('_id').lean();
    if (!exists) {
      await User.register(new User({ username }), 'password');
      console.log(`[db] seeded demo user ${username}`);
    }
  }
}

module.exports = app;
