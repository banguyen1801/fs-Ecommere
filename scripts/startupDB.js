// connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CLOUD_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});
