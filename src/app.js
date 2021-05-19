// basic import
import './config/index.js';

import express from 'express';
const app = express();

// middlewares import
import { genericErrorHandler } from './errors/GenericErrorHandler.js';
import cors from 'cors';
import morgan from 'morgan';

// Import Routes
import userRoute from './routes/users.route.js';
import productRoute from './routes/products.route.js';
import cartRoute from './routes/carts.route.js';
import orderRoute from './routes/orders.route.js';
import orderItemRoute from './routes/orderItems.route.js';
import awsRoute from './routes/awsUploadRoute.js';

// database connection and product table population
import mongoose from 'mongoose';

// import {
//   order,
//   productWithLocalImages,
//   productWithAWSImages,
// } from './productData.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

mongoose.connect(process.env.DATABASE_CLOUD_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to db');
  // await populateProducts(productWithAWSImages);
  // await populateOrders(order);
});

// populate product table with static data from productData.js
async function populateProducts(products) {
  const productTable = await Product.find({});
  if (productTable.length > 0)
    return console.log('Product table already been populated');
  await Product.insertMany(products);
}
// popuate order table with static data from productData.js
async function populateOrders(orders) {
  const orderTable = await Order.find({});
  if (orderTable.length > 0)
    return console.log('Order table already been populated');
  await Order.insertMany(orders);
}

// middleware usage
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('uploads'));

// Routes
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);
app.use('/api', orderRoute);
app.use('/api', awsRoute);

app.use(genericErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`################################################
🛡️  Server listening on port: ${port} 🛡️
################################################`)
);
