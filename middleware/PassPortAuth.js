const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const User = await UserModel.findOne({ email: username });
        
        if (!User) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, User.password, (err, res) => {
            if (res) {
                return done(null, User);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    } catch (err) {
        return done(err);
    }

}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;