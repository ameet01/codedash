var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: {
      type: String,
      min: [6, 'Password too short'],
    },
    bestSpeed: { type: Number, default: 0 },
    averageSpeed: { type: Number, default: 0 },
    totalGames: { type: Number, default: 0 },
    currentGame: { type: Number },
    currentGameType: { type: Number },
    currentGameLang: { type: String },
    currentGameLangNum: { type: Number }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
