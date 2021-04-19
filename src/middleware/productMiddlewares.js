import { badRequest } from '../errors/ApiError.js';
import ProductClass from '../models/Products.js';

async function checkProductExistByName(req, res, next) {
  const name = req.body.name;
  const result = await ProductClass.findProductByName(name);
  if (result) badRequest(res, 'Product Name already been used');
  next();
}

export { checkProductExistByName };
