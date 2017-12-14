var mongoose = require("mongoose");
var passport = require("passport");
var Game = require("../models/Game");

var gameController = {};

// Post registration
gameController.createGame = function(req, res) {
  Game.register(new Game({ language : req.body.language }), function(err, user) {
    if (err) {
      // return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

module.exports = gameController;
