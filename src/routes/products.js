import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
} from '../services/productServices.js';

// add a single product
router.post('/addProducts', async (req, res) => {
  const savedProduct = await addProductServices(req, res);
  console.log('this is saved product', savedProduct);
  res.json(savedProduct);
});

// retrieve all products in the database
router.get('/productList', async (req, res) => {
  const allProducts = await viewAllProductsServices(req, res);
  res.json(allProducts);
});

export default router;
