require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => console.log(`Server listening on port ${port}`));
