import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
  getProductByIdServices,
  editProductService,
} from '../services/productServices.js';

// route to retrieve all products in the database
router.get('/products', async (req, res) => {
  try {
    const allProducts = await viewAllProductsServices();
    res.json(allProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// route to add one product
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

// route to get product by _id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductByIdServices(req.params['id']);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// route to edit one product
router.post('/products/modify', async (req, res) => {
  try {
    const editedProduct = await editProductService(
      req.body._id,
      req.body.newData
    );
    res.json(editedProduct);
  } catch (err) {
    res.json({ message: err.message });
  }
});

export default router;
