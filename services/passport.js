//handles user authentication
//use passport module
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../models/").User;


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


//now use passport for authentication
