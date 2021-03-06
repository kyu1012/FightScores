var flash = require('connect-flash');
// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('./models/index');


// expose this function to our app using module.exports
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      models.User.findById(id, function(err, user) {
          done(err, user);
      });
  });


// =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    // if(!done){
    //   done = password,
    //   password = email,
    //   email = req
    // }
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

// find a user whose email is the same as the forms email
// we are checking to see if the user trying to login already exists
    models.User.findOne({ 'email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err) {
          console.log(err);
          return done(err);
        }

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        else {
        // if there is no user with that email
        // create the user

          // var newUser = new models.User({email: email, password: password});
          var newUser = new models.User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
            // set the user's local credentials
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    psswordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){
    models.User.findOne({ 'email': email }, function(err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }

      if (!user) {
        console.log(req);

        return done(null, false, req.flash('loginMessage', 'No userfound.'));
      }

      if(!user.validPassword(password)) {
        console.log(req);
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return done(null, user);
    })
  }));
};


// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login')
// }
