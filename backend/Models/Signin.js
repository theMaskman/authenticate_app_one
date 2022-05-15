const mongoose = require('mongoose');

const database = mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('signindatabases', database);