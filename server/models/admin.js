const mongoose = require('mongoose');
const bcrpt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');


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
AdminUser.plugin(uniqueValidator);

module.exports = mongoose.model('AdminUser', AdminUser)