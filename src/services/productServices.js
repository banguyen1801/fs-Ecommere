import Product from '../models/Products.js';

import { productCreationValidation } from '../scripts/schemaValidation.js';

import { badRequest } from '../errors/ApiError.js';

async function addProductServices(req, res) {
  const { error } = productCreationValidation(req.body);
  if (error) return badRequest(res, error.details[0].message);

  // Create a new Product
  const product = new ProductClass({
    name: req.body.name,
    categories: req.body.categories,
  });

  return product.save();
}

async function viewAllProductsServices(req, res) {
  const allProducts = await ProductClass.findAllProduct();
  return allProducts;
}

export { addProductServices, viewAllProductsServices };
