const Product = require('../models/Products');

const { productCreationValidation } = require('../scripts/schemaValidation');

async function addProductServices(req, res) {
  const { error } = productCreationValidation(req.body);
  if (error) return badRequest(res, error.details[0].message);

  // check uniqueness of product by name
  // later we should have some other more concrete metric for identify incoming product like a product series (for example miniskirt No-301122)
  const nameExist = await Product.findOne({ name: req.body.name });
  if (nameExist) return badRequest(res, 'name already exist');

  // Create a new Product
  const product = new Product({
    name: req.body.name,
    categories: req.body.categories,
  });
  try {
    var savedProduct = await product.save();
  } catch (err) {
    badRequest(res, err.message);
  }
  return savedProduct;
}

async function viewAllProductsServices(req, res) {
  const allProducts = await Product.find({});
  return allProducts;
}

module.exports = {
  addProductServices,
  viewAllProductsServices,
};
