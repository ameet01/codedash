const passport = require('passport');
const User = require('../models/User');

/**
 * Fields the client is allowed to see. Password hashes/salts are NEVER
 * sent to the browser (the old /api/indexusers and login responses leaked
 * them).
 */
function safeUser(user) {
  if (!user) return null;
  const u = typeof user.toObject === 'function' ? user.toObject() : user;
  return {
    _id: u._id,
    username: u.username,
    bestSpeed: u.bestSpeed || 0,
    averageSpeed: u.averageSpeed || 0,
    totalGames: u.totalGames || 0,
    currentGame: u.currentGame ?? null,
    currentGameType: u.currentGameType ?? null,
    currentGameLang: u.currentGameLang ?? null,
    currentGameLangNum: u.currentGameLangNum ?? null,
  };
}

/**
 * Only game-stat fields may be updated through /api/updateuser. This
 * blocks mass-assignment attacks that could otherwise overwrite a user's
 * hash, salt or username.
 */
const UPDATE_WHITELIST = [
  'bestSpeed',
  'averageSpeed',
  'totalGames',
  'currentGame',
  'currentGameType',
  'currentGameLang',
  'currentGameLangNum',
];

function pickUpdate(body) {
  const out = {};
  for (const key of UPDATE_WHITELIST) {
    if (body[key] !== undefined) out[key] = body[key];
  }
  return out;
}

const userController = {};

// POST /api/register
userController.doRegister = async function (req, res, next) {
  try {
    const { username, password } = req.body || {};

    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return res
        .status(400)
        .json({ error: 'Username must be at least 3 characters.' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters.' });
    }

    const cleanName = username.trim();
    const existing = await User.findOne({ username: cleanName })
      .select('_id')
      .lean();
    if (existing) {
      return res.status(409).json({ error: 'Username is already taken.' });
    }

    const user = await User.register(new User({ username: cleanName }), password);
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json(safeUser(user));
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/login
userController.doLogin = function (req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.json(safeUser(user));
    });
  })(req, res, next);
};

// GET /api/logout
userController.logout = function (req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.json({ ok: true });
    });
  });
};

// GET /api/current_user — returns the logged-in user, or null.
userController.current_user = function (req, res) {
  res.json(safeUser(req.user));
};

// PUT /api/updateuser — save game stats for a user.
// The deployed client sends { id, currentGame, ... } with no session
// cookie, so auth is opportunistic: when a session IS present the caller
// may only update their own record.
userController.update_user = async function (req, res, next) {
  try {
    const id = req.body && req.body.id;
    if (!id) return res.status(400).json({ error: 'Missing user id.' });

    if (req.user && String(req.user._id) !== String(id)) {
      return res.status(403).json({ error: 'Not allowed.' });
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: pickUpdate(req.body) },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json(safeUser(user));
  } catch (err) {
    next(err);
  }
};

// GET /api/indexusers — users currently in a multiplayer game (lobby list).
userController.indexusers = async function (req, res, next) {
  try {
    const users = await User.find({ currentGame: { $gt: 0 } })
      .select('-hash -salt -__v')
      .lean();
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
