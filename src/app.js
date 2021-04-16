const config = require('./config');
const compression = require('compression');
const express = require('express');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// utils
require('./scripts/startupDB');

// Middleware
app.use(express.json());
app.use(compression());

// Route Middleware
app.use('/', authRoute);
app.use('/', postRoute);

app.listen(config.port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################`)
);
