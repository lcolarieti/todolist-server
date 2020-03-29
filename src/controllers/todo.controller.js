const ObjectId = require('mongodb').ObjectID;
const List = require('../models/list.model.js');

exports.create = (req, res) => {
  if(!req.body.name && !req.params.listId) {
    return res.status(500).send({
      message: "Todo text or listId can not be empty"
    });
  }

  List.findByIdAndUpdate(req.params.listId, {
      $push: {todos: {
        name: req.body.name,
        completed: false
      }}
  }, {new: true}).then(item => {
      if(!item) {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      res.send(item);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      return res.status(500).send({
          message: "Error updating item with id " + req.params.listid
      });
  });
};

exports.update = (req, res) => {

  if(!req.body.name && !req.body.hasOwnProperty('completed')) {
      return res.status(400).send({
          message: "Todo name or completed value can not be empty"
      });
  }

  const set = (req) => {
    let value = (req.body.name ? req.body.name : !req.body.completed);
    let label = "todos.$." + (req.body.name ? "name" : "completed");
    let setValue = {};
    setValue['$set'] = {};
    setValue['$set'][label] = value;
    return  setValue;
  };

  List.findOneAndUpdate({'_id': req.params.listId, "todos._id": req.params.todoId },
    set(req), {new: true}).then(item => {
      if(!item) {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      res.send(item);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      return res.status(500).send({
          message: "Error updating item with id " + req.params.listId
      });
  });

};

exports.delete = (req, res) => {

  List.findOneAndUpdate(
    { _id: req.params.listId },
    { $pull: { todos: { _id: req.params.todoId} } },
    { new: true }
  ).then(item => {
      if(!item) {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      res.send(item);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      return res.status(500).send({
          message: "Error updating item with id " + req.params.listId
      });
  });
};
