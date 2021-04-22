import config from './config/index.js';
import express from 'express';
import { genericErrorHandler } from './errors/GenericErrorHandler.js';
const app = express();

// Import Routes
import userRoute from './routes/users.route.js';
import productRoute from './routes/products.route.js';
import cartRoute from './routes/carts.route.js';
import orderRoute from './routes/orders.route.js';

// utils
// require('./scripts/startupDB');
import mongoose from 'mongoose';
mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
app.use(express.json());

// Route Middleware
app.use('/', userRoute);
app.use('/', productRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);

app.use(genericErrorHandler);

app.listen(config.port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################`)
);
