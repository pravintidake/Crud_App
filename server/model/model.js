const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
    },
    gender : String,
    status : String
});

const UserDB = mongoose.model('CRUD_User', schema);
module.exports = UserDB;