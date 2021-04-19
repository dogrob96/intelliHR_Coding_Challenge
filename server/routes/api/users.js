const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const auth = require('../../config/auth');
const User = mongoose.model('User')

//Create User
router.post('/', auth.optional, (req, res, next) => {
    const {  body: { user } } = req;

    if(!user.name) {
        return res.status(422).json({
            errors: {
                name: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
    if(!user.name) {
        return res.status(422).json({
            errors: {
                name: 'is required',
            }
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            }
        });
    }
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).info;
    })(req,res,next);
});

router.get('/current', auth.required,( req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
    .then((user) => {
        if(!user) {
            return res.sendStatus(400);
        }

        return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;