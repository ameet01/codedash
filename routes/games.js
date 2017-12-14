var express = require('express');
var router = express.Router();
var game = require("../controllers/GameController.js");


router.post('/api/createGame', game.createGame);


module.exports = router;
