var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res, next) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      // return res.render('register', { user : user });
      console.log('error while user register!', err);
      return next(err);
    } else {
      passport.authenticate('local')(req, res, function () {
        // res.redirect('/');
        res.send(req.user);
      });
    }
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.send(req.user);
  });
};

// logout
userController.logout = function(req, res) {
  req.logout(function(err) {
    req.session.destroy();
    res.redirect('/');
  });
};

//currentuser
userController.current_user = function(req, res) {
  res.send(req.user);
};

userController.update_user = function(req, res, next) {
  User.findOneAndUpdate({_id: req.body.id}, req.body, {new: true}, function(err, place) {
    res.send(place);
  });
};

userController.indexusers = function(req, res, next) {
  User.find({currentGame: { $gt: 0 }}, function(err, place) {
    res.send(place);
  });
};


module.exports = userController;
