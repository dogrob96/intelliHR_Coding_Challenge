const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    hash: String,
    salt: String,
    name: String,
    testChamber: Number,
    dateOfBirth: Date,
    totalScore: Number,
    alive: Boolean
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        name: this.name,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret')
}

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        name: this.name,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('User', userSchema);