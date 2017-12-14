var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    language: { type: String, required: true },
    isSinglePlayer: { type: Boolean, default: true },
    numPlayers: { type: Number, min: 0, default: 0 },
    maxPlayers: { type: Number, min: 0, default: 2 },
    winner: { type: Schema.ObjectId },
    winnerTime: { type: Number, min: 0 },
    winnerSpeed: { type: Number, min: 0 },
    players: [Schema.ObjectId]
});

module.exports = mongoose.model('Game', GameSchema);
