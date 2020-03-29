const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
})

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// listen for requests
require('./routes/list.routes.js')(app);
require('./routes/todo.routes.js')(app);
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
