const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    language: {
        type: String,
        default: null
    },
    postalcode: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active',
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'admin',
    },
    country: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: "Active"
    },
    bio: {
        type: String,
        default: null
    },
    timezone: {
        type: String,
        default: null
    },
    linkedin: {
        type: String,
        default: null
    },
    facebook: {
        type: String,
        default: null
    },
    instagram: {
        type: String,
        default: null
    },
    membership_level: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null
    },
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;