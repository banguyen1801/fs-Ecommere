import Product from '../models/Product.js';

import { productCreationValidation } from '../scripts/schemaValidation.js';

import { ProductExistedErr } from '../errors/ApiError.js';
// service to add one product
async function addProductServices(name, categories) {
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

// service to get all products available
async function viewAllProductsServices() {
  const allProducts = await Product.find({}).skip(15).limit(15);
  const count = await Product.find({}).countDocuments();
  if (!allProducts) throw new Error('There is no product at the moment');
  return { product: allProducts, maxPage: Math.ceil(count / 15) };
}

async function findProductByIdService(id) {
  const product = await Product.findById(id).exec();
  if (!product) throw new Error(`Product with ${id} does not exist`);
  return product;
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

async function advancedProductSearchService({ categories, page, sort }) {
  const sortOption = await sortIdentifier(sort);

  const filteredProduct = await Product.find({
    categories: { $in: categories },
  })
    .sort(sortOption)
    .skip((page - 1) * 15)
    .limit(15)
    .exec();

  const count = await Product.find({
    categories: { $in: categories },
  })
    .sort(sortOption)
    .countDocuments();
  if (!filteredProduct)
    throw new Error("Product of this category doesn't exist");

  return { product: filteredProduct, maxPage: Math.ceil(count / 15) };
}

async function sortIdentifier(sort = '') {
  switch (sort) {
    case 'A-Z':
      return { name: 1 };
    case 'Z-A':
      return { name: -1 };
    case 'highestprice':
      return { price: -1 };
    case 'lowestprice':
      return { price: 1 };
    default:
      return {};
  }
}

export {
  addProductServices,
  viewAllProductsServices,
  editProductService,
  advancedProductSearchService,
  findProductByIdService,
};
