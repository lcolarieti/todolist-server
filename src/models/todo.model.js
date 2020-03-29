const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: String,
    completed: Boolean
}, {
    timestamps: true
});

module.exports = TodoSchema;
