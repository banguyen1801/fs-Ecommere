import express from 'express';
const router = express.Router();

import {
  addProductServices,
  viewAllProductsServices,
  editProductService,
  advancedProductSearchService,
  findProductByIdService,
  createProductService,
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
// create product support with multer, path, uuid, fs
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filesDir = 'uploads/images';
    // check if directory exists
    if (!fs.existsSync(filesDir)) {
      // if not create directory
      fs.mkdirSync(filesDir);
    }

    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    //get file extension
    const ext = path.extname(file.originalname);
    //get random id
    const id = uuidv4();
    const filePath = `images/${id}${ext}`;

    cb(null, filePath);
  },
});
var upload = multer({ storage: storage });
// req.files for access to arrays object of files
// set filename (aka file path) as the image src in database
router.post(
  '/products/create',
  upload.array('uploaded_image', 8),
  async (req, res, next) => {
    //req.body has all the other props, productImages holds the url array for image

    //create a dummy array to use as input for model creation
    const productImages = [];
    //each filename is set as its path in BE server
    req.files.forEach((file) => productImages.push(`${file.filename}`));
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
