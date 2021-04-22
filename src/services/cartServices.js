import Cart from '../models/Cart.js';

import { cartCreationValidation } from '../scripts/schemaValidation.js';

import { CartNotExistErr } from '../errors/ApiError.js';

// get all cart
async function getAllCartsService(page) {
  const allCarts = await Cart.find({});
  // .skip(page * 15)
  // .limit(15)
  // .exec();
  return allCarts;
}

// create one cart
// FIX: mongoose objectId failed to pass Joi validation
async function createCartService(user_id) {
  const { error } = await cartCreationValidation({
    user_id,
  });
  if (error) throw new Error(error);
  const cart = new Cart({
    user_id: user_id,
  });

  const savedCart = await cart.save();
  return savedCart;
}

// update order
async function updateCartService(id, newData) {
  if (!newData) throw new Error('newData is not available');

  const cartExist = await Cart.find({ _id: id }).exec();
  if (!cartExist) throw CartNotExistErr();

  const updatedCart = await Cart.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedCart;
}

// get cart by user_id
async function getCartByUserIdService(id) {
  const cart = await Cart.find({ user_id: id }).exec();
  if (!cart) throw CartNotExistErr();
  return cart;
}

export {
  createCartService,
  getAllCartsService,
  getCartByUserIdService,
  updateCartService,
};
