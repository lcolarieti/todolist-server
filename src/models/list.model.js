const mongoose = require('mongoose');
const TodoSchema = require('../models/todo.model.js');


const ListSchema = mongoose.Schema({
    name: String,
    todos: [TodoSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('List', ListSchema);
