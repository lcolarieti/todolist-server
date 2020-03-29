module.exports = (app) => {
    const list = require('../controllers/list.controller.js');

    app.post('/list', list.create);
    app.get('/list', list.findAll);
    app.get('/list/:listId', list.findOne);
    app.put('/list/:listId', list.update);
    app.delete('/list/:listId', list.delete);  
}
