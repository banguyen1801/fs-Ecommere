import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
  editProductService,
  advancedProductSearchService,
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

// get product with filtered categories
// filter with product_type

router.get('/products/:params1/:page', async (req, res, next) => {
  let value = {
    params1: req.params.params1,
    page: req.params.page,
  };
  try {
    const { product, maxPage } = await advancedProductSearchService(value);
    res.json({ product, maxPage });
  } catch (err) {
    next(err);
  }
});

// filter with product_type and collection
router.get('/products/:params1/:params2/:page', async (req, res, next) => {
  let value = {
    params1: req.params.params1,
    params2: req.params.params2,
    page: req.params.page,
  };
  try {
    const filteredProduct = await advancedProductSearchService(value);
    res.json(filteredProduct);
  } catch (err) {
    next(err);
  }
});

export default router;
