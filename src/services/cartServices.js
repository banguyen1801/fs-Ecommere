import Cart from '../models/Carts.js';

import { cartCreationValidation } from '../scripts/schemaValidation.js';

import { CartNotExistErr } from '../errors/ApiError.js';

// get all cart
async function getAllCartsService(page) {
  const allCarts = await Cart.find({})
    .skip(page * 15)
    .limit(15)
    .exec();
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
  // return cart;
  const savedCart = await cart.save();
  return savedCart;
}

// get cart by user_id
async function getCartByUserIdService(id) {
  const cart = await Cart.find({ user_id: id }).exec();
  if (!cart) throw CartNotExistErr();
  return cart;
}

// update order
async function updateCartService(id, newData) {
  if (!newData) throw new Error('newData is no available');

  const cartExist = await Cart.findOne({ _id: id }).exec();
  if (!cartExist) throw CartNotExistErr();

  const updatedCart = await Cart.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedCart;
}

export {
  createCartService,
  getAllCartsService,
  getCartByUserIdService,
  updateCartService,
};
