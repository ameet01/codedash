var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");

// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/api/register', auth.register);

// route for register action
router.post('/api/register', auth.doRegister);

// route to login page
router.get('/api/login', auth.login);

// route for login action
router.post('/api/login', auth.doLogin);

// route for logout action
router.get('/api/logout', auth.logout);

//currentuser
router.get('/api/current_user', auth.current_user);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/api/updateuser', auth.update_user);

router.get('/api/indexusers', auth.indexusers);

module.exports = router;
