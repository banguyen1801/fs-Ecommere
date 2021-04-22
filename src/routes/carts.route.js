import express from 'express';
const router = express.Router();

import {
  getAllCartsService,
  createCartService,
  getCartByUserIdService,
  updateCartService,
} from '../services/cartServices.js';

// retrieve all carts
router.get('/carts', async (req, res, next) => {
  try {
    const allCarts = await getAllCartsService();
    res.json(allCarts);
  } catch (err) {
    next(err);
  }
});
// create a cart
router.post('/carts', async (req, res, next) => {
  try {
    const allCarts = await createCartService(req.body.user_id);
    res.json(allCarts);
  } catch (err) {
    next(err);
  }
});

// update a cart using card_id and new data
router.post('/carts/modify', async (req, res, next) => {
  try {
    const editedCart = await updateCartService(req.body._id, req.body.newData);
    res.json(editedCart);
  } catch (err) {
    next(err);
  }
});
// retrieve one cart by _user_id
router.get('/carts/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    const cart = await getCartByUserIdService(req.params.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

export default router;
