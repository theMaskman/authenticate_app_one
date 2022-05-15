const mongoose = require('mongoose');

const profileData = mongoose.Schema({
    name: {
        type: String,
        default: '-'
    },
    bio: {
        type: String,
        default: 'Human from earth'
    },
    phone: {
        type: Number,
        default: 000000000
    },
    email: {
        type: String
    },
    password: {
        type: String,
        default: '******'
    }
});

module.exports = mongoose.model('profileData', profileData);