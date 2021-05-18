import express from 'express';
const router = express.Router();

import { isUser, isAdmin } from '../middleware/verify.js';

import upload from '../services/awsUploadServices.js';

import {
  addProductServices,
  advancedProductSearchService,
  createProductService,
  editProductService,
  findProductByIdService,
  fetchInitialProductsService,
  fetchAllProductsServices,
  removeProductService,
} from '../services/productServices.js';

// retrieve all products in the database
router.get('/products/all', isAdmin, async (req, res, next) => {
  const value = {
    page: parseInt(req.query.page, 10),
    limit: parseInt(req.query.limit, 10),
  };
  try {
    const allProducts = await fetchAllProductsServices(value);
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
});

// retrieve 15 products for initial shop load
router.get('/products/initial', async (req, res, next) => {
  try {
    const initialProducts = await fetchInitialProductsService();
    res.json(initialProducts);
  } catch (error) {
    next(error);
  }
});

// add one product

router.post(
  '/products/create',
  isAdmin,
  upload.array('uploaded_image', 8),
  async (req, res, next) => {
    //req.body has all the other props, productImages holds the url array for image

    //create a dummy array to use as input for model creation
    const productImages = [];
    //each filename is set as its url on aws S3 server
    req.files.forEach((file) => productImages.push(`${file.location}`));
    const values = {
      categories: req.body.categories,
      size: req.body.size,
      color: req.body.color,
      name: req.body.productName,
      brand: req.body.brand,
      price: req.body.price,
      stock: req.body.quantity,
      description: req.body.description,
      imageUrl: productImages,
    };
    //do asyncchronos createProductService here
    try {
      const newProduct = await createProductService(values);
      res.json(newProduct);
    } catch (error) {
      next(err);
    }
  }
);

router.post('/products', isAdmin, async (req, res, next) => {
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
router.post('/products/modify', isAdmin, async (req, res, next) => {
  try {
    const editedProduct = await editProductService(
      req.body.id,
      req.body.newData
    );
    res.json(editedProduct);
  } catch (err) {
    next(err);
  }
});

//remove one product
router.post('/products/remove', isAdmin, async (req, res, next) => {
  console.log(req.body);

  try {
    const removedProduct = await removeProductService(req.body);
    res.json(removedProduct);
  } catch (error) {
    next(error);
  }
});

// get product with filtered categories
// filter with product_type and collection
// TODO: https://www.sitepoint.com/get-url-parameters-with-javascript/#:~:text=URL%20parameters%20%28also%20called%20query%20string%20parameters%20or,link%20referrals%2C%20product%20information%2C%20user%20preferences%2C%20and%20more.
router.get('/products/advanced', isUser, async (req, res, next) => {
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

router.get('/products/:id', isUser, async (req, res, next) => {
  try {
    const product = await findProductByIdService(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
