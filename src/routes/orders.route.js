import express from 'express';
const router = express.Router();

import {
  getAllOrdersService,
  createOrderService,
  getOrderByIdService,
  updateOrderService,
} from '../services/orderServices.js';

// get all orders
router.get('/orders', async (req, res, next) => {
  try {
    const allOrders = await getAllOrdersService();
    res.json(allOrders);
  } catch (err) {
    next(err);
  }
});

// create an order
router.post('/orders', async (req, res, next) => {
  try {
    const newOrder = await createOrderService(
      req.body.user_id,
      req.body.detail
    );
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

// update an order
router.post('/orders/modify', async (req, res, next) => {
  try {
    const editedOrder = await updateOrderService(
      req.body.order_id,
      req.body.newData
    );
    res.json(editedOrder);
  } catch (err) {
    next(err);
  }
});

// get order by _id
router.get('/orders/:id', async (req, res, next) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
