import Product from '../models/Products.js';

import { productCreationValidation } from '../scripts/schemaValidation.js';

// add one product
async function addProductServices(name, categories) {
  const { error } = productCreationValidation({ name, categories });
  if (error) {
    throw new Error(error);
  }

  const productExist = await Product.findOne({ name: name });
  if (productExist) {
    throw new Error('Product already exist!');
  }

  // Create a new Product
  const product = new Product({
    name: name,
    categories: categories,
  });
  try {
    var savedProduct = await product.save();
  } catch (err) {
    throw new Error('Failed to create new product');
  }
  return savedProduct;
}

// get and return a product by its _id
async function getProductByIdServices(id) {
  const product = await Product.findById({ _id: id });
  if (!product) throw new Error(`Cannot find product with id ${id}`);
  return product;
}

// get all products available
async function viewAllProductsServices() {
  const allProducts = await Product.find({});
  if (!allProducts) throw new Error('There is no product at the moment');
  return allProducts;
}

export { addProductServices, viewAllProductsServices, getProductByIdServices };
