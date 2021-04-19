import config from './config/index.js';
import express from 'express';
// import genericErrorHandler from './errors/GenericErrorHandler';
const app = express();

// Import Routes
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
// import productRoute from './routes/products.js';

// utils
// require('./scripts/startupDB');
import mongoose from 'mongoose';
mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});

// Middleware
// compression can save a lot of data and improve speed, need to implement and test properly
// const compression = require('compression');
// app.use(compression());
// app.use(genericErrorHandler);
app.use(express.json());

// Route Middleware
app.use('/', authRoute);
app.use('/', postRoute);
// app.use('/', productRoute);

app.listen(config.port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################`)
);
