// connect to database
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});
