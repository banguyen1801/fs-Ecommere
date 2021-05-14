import Product from '../models/Product.js';

import { productCreationValidation } from '../scripts/schemaValidation.js';

import { ProductExistedErr } from '../errors/ApiError.js';

// service to add one product
async function createProductService({
  name,
  size,
  color,
  categories,
  price,
  stock,
  brand,
  description,
  imageUrl,
}) {
  // Create a new Product
  const product = new Product({
    name: name,
    size: size,
    color: color,
    categories: categories,
    price: price,
    stock: stock,
    brand: brand,
    description: description,
    imageUrl: imageUrl,
  });
  try {
    var savedProduct = await product.save();
  } catch (err) {
    throw new Error(err.message);
  }
  return savedProduct;
}
async function addProductServices({
  name,
  size,
  color,
  categories,
  price,
  stock,
  brand,
}) {
  // Create a new Product
  const product = new Product({
    name: name,
    size: size,
    color: color,
    categories: categories,
    price: price,
    stock: stock,
    brand: brand,
  });
  try {
    var savedProduct = await product.save();
  } catch (err) {
    throw new Error(err.message);
  }
  return savedProduct;
}

// service to get all products available
// take params of page, and limit for number of product each page
async function viewAllProductsServices({ page, limit }) {
  const allProducts = await Product.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();
  const count = await Product.find({}).countDocuments();
  if (!allProducts) throw new Error('There is no product at the moment');
  return { product: allProducts, maxPage: Math.ceil(count / limit) };
}

async function findProductByIdService(id) {
  const product = await Product.findById(id).exec();
  if (!product) throw new Error(`Product with ${id} does not exist`);
  return product;
}

// service to edit one product
async function editProductService(id, newData) {
  if (!newData) throw new Error('Nothing passed into service');

  const product = await Product.findById(id).exec();
  if (!product) throw new Error('Product does not exist');

  const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedProduct;
}

//remove one product and return removed product
async function removeProductService({ _id }) {
  console.log('service layer', _id);
  const removedProduct = await Product.findOneAndRemove({ _id: _id });
  return removedProduct;
}

// search for products but have many param for filtering result
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
    case 'highestPrice':
      return { price: -1 };
    case 'lowestPrice':
      return { price: 1 };
    case 'Popularity':
      return { popularity: 1 };
    default:
      return {};
  }
}

export {
  addProductServices,
  advancedProductSearchService,
  createProductService,
  editProductService,
  findProductByIdService,
  viewAllProductsServices,
  removeProductService,
};
