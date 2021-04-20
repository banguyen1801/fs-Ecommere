import Product from '../models/Products.js';

import { productCreationValidation } from '../scripts/schemaValidation.js';

import { ProductExistedErr } from '../errors/ApiError.js';
// service to add one product
async function addProductServices(name, categories) {
  const { error } = productCreationValidation({ name, categories });
  if (error) {
    throw new Error(error);
  }

  const productExist = await Product.findOne({ name: name });
  if (productExist) {
    throw ProductExistedErr();
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

// service to get and return a product by its _id
async function getProductByIdServices(id) {
  const product = await Product.findById({ _id: id });
  if (!product) throw new Error(`Cannot find product with id ${id}`);
  return product;
}

// service to get all products available
async function viewAllProductsServices() {
  const allProducts = await Product.find({});
  if (!allProducts) throw new Error('There is no product at the moment');
  return allProducts;
}

// service to edit one product
async function editProductService(id, newData) {
  if (!newData) throw new Error('Nothing passed into service');

  const product = await Product.findOne({ _id: id }).exec();
  if (!product) throw new Error('Product does not exist');

  const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedProduct;
}

export {
  addProductServices,
  viewAllProductsServices,
  getProductByIdServices,
  editProductService,
};
