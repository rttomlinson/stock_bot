//handles user authentication
//use passport module
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../models/sequelize").User;

module.exports = app => {

  app.use(passport.initialize());
  app.use(passport.session());

  //Passport-local strategy
  let LocalStrategy = require('passport-local').Strategy;
  let localStrategy = new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
  }, function(email, password, done) {
      User.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { message: 'Invalid username or password' });
          }
          return done(null, user);
        })
        .catch(done);
  });

  //Attach strategy to passport instance
  passport.use(localStrategy);

  let bearerStrategy = new BearerStrategy(
    function(token, done) {
      User.findOne({
        token
      })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        done(err);
      });
    });


    passport.use(bearerStrategy);


    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    return passport;
}


//now use passport for authentication
