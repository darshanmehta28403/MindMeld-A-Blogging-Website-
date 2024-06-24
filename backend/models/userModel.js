const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    gender: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true,
        default: "no"
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
    