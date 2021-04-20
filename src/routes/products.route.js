import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
  getProductByIdServices,
  editProductService,
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
router.post('/products', async (req, res, next) => {
  try {
    const savedProduct = await addProductServices(
      req.body.name,
      req.body.categories
    );
    res.json(savedProduct);
  } catch (err) {
    next(err);
  }
});

// get product by _id
router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await getProductByIdServices(req.params['id']);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// edit one product
router.post('/products/modify', async (req, res, next) => {
  try {
    const editedProduct = await editProductService(
      req.body._id,
      req.body.newData
    );
    res.json(editedProduct);
  } catch (err) {
    next(err);
  }
});

export default router;
