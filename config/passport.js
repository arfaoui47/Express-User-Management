var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (err, done) {
    done(null, user.id);
});

passport.deserializeUser(function (err, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passport',
    passReqToCallback: true
}, function (req, res, email, password, done){
    User.findOne({"email": email}, function(err, user) {
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false, {message: 'email already in use!'});
        }
        var newUser = new User;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function (err, result) {
            if (err){
                done(err);
            }
            return done(null, newUser);
        });
    });
}));