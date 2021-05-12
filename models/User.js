const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: { type: String },
    authToken: { type: String },
    password: { type: String },
    email: { type: String },
    isDeleted: { type: Boolean, default: false },
}, {
    strict: true
});

module.exports = mongoose.model('User', userSchema);