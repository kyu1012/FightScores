var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/fightscore');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

var userSchema = new Schema({
  'email': { type: String, required: true, unique: true },
  'password': { type: String, required: true, unique: true },
  'score': [fightSchema],
  'salt': String
});

var fightSchema = new Schema({
  f1: String,
  f2: String,
  f1_roundScores: Array,
  f2_roundScores: Array,
  f1_score: Number,
  f2_score: Number,
  user_email: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var Fight = mongoose.model("Fight", fightSchema);
var User = mongoose.model("User", userSchema);
// var Scores = mongoose.model("Scores", fightScore);

module.exports = {"Fight": Fight, "User": User};

