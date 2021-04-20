import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
  getProductByIdServices,
} from '../services/productServices.js';

// retrieve all products in the database
router.get('/products', async (req, res) => {
  try {
    const allProducts = await viewAllProductsServices();
    res.json(allProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add one product
router.post('/products', async (req, res) => {
  try {
    const savedProduct = await addProductServices(
      req.body.name,
      req.body.categories
    );
    res.json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get product by _id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductByIdServices(req.params['id']);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/');

export default router;
