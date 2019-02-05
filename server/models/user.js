const mongoose = require('mongoose');
const bcrpt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');


const User = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createAt: {
        type: String, default: Date.now()
    }
});

User.methods.generateHash = function (password) {
    return bcrpt.hashSync(password, bcrpt.genSaltSync(8), null);
}
User.methods.validatePassword = function (password) {
    return bcrpt.compareSync(password, this.password);
}
User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User)