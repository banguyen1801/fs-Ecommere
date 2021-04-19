const router = require('express').Router();
const verify = require('../services/verifyToken');
const {
  addProductServices,
  viewAllProductsServices,
} = require('../services/productServices');

// add a single product
router.post('/addProducts', verify, async (req, res) => {
  const savedProduct = await addProductServices(req, res);
  res.json(savedProduct);
});

// retrieve all products in the database
router.get('/productList', verify, async (req, res) => {
  const allProducts = await viewAllProductsServices(req, res);
  res.json(allProducts);
});

module.exports = router;
