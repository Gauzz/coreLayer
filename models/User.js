const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName : {type : String},
    email : {type : String},
    phoneNumber : {type:String},
    isDeleted : {type:Boolean, default:false},
    age : {type:Number}
}, { 
    strict: true
});

module.exports = mongoose.model('User', userSchema);