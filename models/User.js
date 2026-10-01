const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    bestSpeed: { type: Number, default: 0 },
    averageSpeed: { type: Number, default: 0 },
    totalGames: { type: Number, default: 0 },
    currentGame: { type: Number, default: null },
    currentGameType: { type: Number, default: null },
    currentGameLang: { type: String, default: null },
    currentGameLangNum: { type: Number, default: null },
  },
  { timestamps: true }
);

// Adds username/hash/salt fields + register/authenticate/serialize helpers.
// Passwords are stored as salted PBKDF2 hashes (never plaintext).
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
