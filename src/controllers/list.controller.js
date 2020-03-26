const List = require('../models/list.model.js');

exports.create = (req, res) => {
  if(!req.body.name) {
    return res.status(500).send({
      message: "List name can not be empty"
    });
  }

  const list = new List({
    name: req.body.name
  });

  list.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the item."
    });
  });
};

exports.findAll = (req, res) => {
  List.find().then(items => {
      res.send(items);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving items."
      });
  });
};

exports.findOne = (req, res) => {
  List.findById(req.params.listId)
  .then(item => {
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
          message: "Error retrieving item with id " + req.params.listId
      });
  });
};

exports.update = (req, res) => {

  if(!req.body.name) {
      return res.status(400).send({
          message: "List name can not be empty"
      });
  }

  List.findByIdAndUpdate(req.params.listId, {
      name: req.body.name
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

exports.delete = (req, res) => {
  List.findByIdAndRemove(req.params.listId).then(item => {
      if(!item) {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      res.send({message: "Item deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Item not found with id " + req.params.listId
          });
      }
      return res.status(500).send({
          message: "Could not delete item with id " + req.params.listId
      });
  });
};
