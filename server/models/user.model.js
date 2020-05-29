var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    phone: String,
    imageUrl: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;