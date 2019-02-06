const mongoose = require('mongoose');
const bcrpt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require("../config");

const AdminUser = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createAt: {
        type: String, default: Date.now()
    }
});

AdminUser.methods.generateHash = function (password) {
    return bcrpt.hashSync(password, bcrpt.genSaltSync(8), null);
}
AdminUser.methods.validatePassword = function (password) {
    return bcrpt.compareSync(password, this.password);
}

AdminUser.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        username:this.username,
        id:this._id,
        exp:parseInt(expirationDate.getTime()/1000,10),
    },config.secret)
}

AdminUser.plugin(uniqueValidator);

module.exports = mongoose.model('AdminUser', AdminUser)