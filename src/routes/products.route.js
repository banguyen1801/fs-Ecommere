import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
  editProductService,
  advancedProductSearchService,
  findProductByIdService,
} from '../services/productServices.js';

// retrieve all products in the database
router.get('/products/all', async (req, res) => {
  const value = {
    page: parseInt(req.query.page, 10),
    limit: parseInt(req.query.limit, 10),
  };
  try {
    const allProducts = await viewAllProductsServices(value);
    res.json(allProducts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add one product
router.post('/products', async (req, res, next) => {
  const value = {
    size: req.body.params.size,
    name: req.body.params.name,
    brand: req.body.params.brand,
    price: parseInt(req.body.params.price, 10),
    color: req.body.params.color,
    stock: parseInt(req.body.params.stock, 10),
    categories: req.body.params.categories,
  };

  try {
    const savedProduct = await addProductServices(value);
    res.json(savedProduct);
  } catch (err) {
    next(err);
  }
});
// edit one product
router.post('/products/modify', async (req, res, next) => {
  try {
    const editedProduct = await editProductService(
      req.body.params.id,
      req.body.params.newData
    );
    res.json(editedProduct);
  } catch (err) {
    next(err);
  }
});

// get product with filtered categories
// filter with product_type

// filter with product_type and collection
// TODO: https://www.sitepoint.com/get-url-parameters-with-javascript/#:~:text=URL%20parameters%20%28also%20called%20query%20string%20parameters%20or,link%20referrals%2C%20product%20information%2C%20user%20preferences%2C%20and%20more.
router.get('/products/advanced', async (req, res, next) => {
  let value = {
    categories: req.query.categories,
    page: req.query.page,
    sort: req.query.sort,
  };

  try {
    const filteredProduct = await advancedProductSearchService(value);
    res.json(filteredProduct);
  } catch (err) {
    next(err);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await findProductByIdService(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
