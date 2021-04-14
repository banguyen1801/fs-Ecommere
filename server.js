const config = require('./config');
const express = require('express');
const app = express();

// Import Router
const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js');

// Scripts
require('./scripts/startupDB.js');

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(config.port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################`)
);
