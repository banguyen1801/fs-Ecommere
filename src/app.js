import config from './config/index.js';
import express from 'express';
import { genericErrorHandler } from './errors/GenericErrorHandler.js';
const app = express();

// Import Routes
import userRoute from './routes/users.route.js';
import productRoute from './routes/products.route.js';
import cartRoute from './routes/carts.route.js';
import orderRoute from './routes/orders.route.js';
import orderItemRoute from './routes/orderItems.route.js';

// database connection and product table population
import mongoose from 'mongoose';
import product from './productData.js';
import Product from './models/Product.js';
mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to db');
  await populateProducts(product);
});

async function populateProducts(products) {
  const productTable = await Product.find({});
  if (productTable.length > 0)
    return console.log('Table already been populated');
  await Product.insertMany(products);
}

app.use(express.json());

// Route Middleware
app.use('/', userRoute);
app.use('/', productRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);
app.use('/', orderItemRoute);

app.use(genericErrorHandler);

app.listen(config.port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################`)
);

const productTable = [];
