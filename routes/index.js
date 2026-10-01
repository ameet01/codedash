const express = require('express');

const router = express.Router();
const auth = require('../controllers/AuthController.js');

// Service info (the React frontend is served separately as a static site).
router.get('/', (req, res) => {
  res.json({ ok: true, service: 'codedash-api' });
});

// route for register action
router.post('/api/register', auth.doRegister);

// route for login action
router.post('/api/login', auth.doLogin);

// route for logout action
router.get('/api/logout', auth.logout);

// current user
router.get('/api/current_user', auth.current_user);

// save game stats
router.put('/api/updateuser', auth.update_user);

// users currently in a multiplayer game (lobby list)
router.get('/api/indexusers', auth.indexusers);

module.exports = router;
