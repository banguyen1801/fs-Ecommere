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

async function advancedProductSearchService({ params1, params2, page }) {
  // const sortOption = sortIdentifier(sort);
  const filteredProduct = await Product.find({
    categories: { $in: [params1, params2] },
  })
    .skip((page - 1) * 15)
    .limit(15)
    // .sort(sortOption)
    .exec();
  if (!filteredProduct)
    throw new Error("Product of this category doesn't exist");

  return filteredProduct;
}

async function sortIdentifier(sort) {
  switch (sort) {
    case 'a-Z':
      sort = '-name';
      return sort;
    case 'Z-a':
      sort = 'name';
      return sort;
    case 'highestprice':
      sort = '-price';
      return sort;
    case 'lowestprice':
      sort = 'price';
      return sort;
    default:
      return '';
  }
}

export {
  addProductServices,
  viewAllProductsServices,
  editProductService,
  advancedProductSearchService,
};
