//handles user authentication
//use passport module
const passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;

module.exports = wagner => {

  wagner.factory("passport", function(User) {

    //Passport-local strategy
    let localStrategy = new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
    }, function(email, password, done) {
      console.log("attempting to authenticate");
      User.findOne({
          email
        })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              message: 'Invalid username or password'
            });
          }
          return done(null, user);
        })
        .catch(done);
    });

    //Attach strategy to passport instance
    passport.use(localStrategy);

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id)
        .then(user => {
          done(null, user);
        })
        .catch(done);
    });
    return passport;
  });
};
