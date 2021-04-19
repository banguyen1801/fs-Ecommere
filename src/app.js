const config = require('./config');
const express = require('express');
const genericErrorHandler = require('./errors/GenericErrorHandler');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const productRoute = require('./routes/products');

// utils
require('./scripts/startupDB');

// Middleware
// compression can save a lot of data and improve speed, need to implement and test properly
// const compression = require('compression');
// app.use(compression());
app.use(express.json());
app.use(genericErrorHandler);

// Route Middleware
app.use('/', authRoute);
app.use('/', postRoute);
app.use('/', productRoute);

app.listen(config.port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################`)
);
