const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
{
    username:
    {
        type: String,
        required: true,
        unique: true
    },

    email:
    {
        type: String,
        required: true,
        unique: true
    },

    password:
    {
        type: String,
        required: true    
    },

    name:
    {
        type: String,
        required: true
    },

    permission:
    {
        type: String,
        required: true
    }

    //address if can be pointed with maps later
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;