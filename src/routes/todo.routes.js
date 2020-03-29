module.exports = (app) => {
    const todo = require('../controllers/todo.controller.js');

    app.post('/list/:listId', todo.create);
    app.put('/list/:listId/:todoId', todo.update);
    app.delete('/list/:listId/:todoId', todo.delete);
}
