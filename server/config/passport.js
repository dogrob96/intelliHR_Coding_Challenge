const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'user[name]',
    passwordField: 'user[password]',
}, (name, password, done) => {
    User.findOne({ name })
        .then((user) => {
            if(!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'name or password': 'is invalid' } });
            }

            return done(null, user);
        }).catch(done);
}));