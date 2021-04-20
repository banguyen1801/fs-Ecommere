import express from 'express';
const router = express.Router();

import {
  getAllOrdersService,
  createOrderService,
  getOrderByIdService,
  updateOrderService,
} from '../services/orderServices.js';

// retrieve all orders
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
    const allOrders = await createOrderService(
      req.body.user_id,
      req.body.order_items,
      req.body.detail,
      req.body.total,
      req.body.status
    );
    res.json(allOrders);
  } catch (err) {
    next(err);
  }
});

// retrieve one order by id
router.post('/orders/:id', async (req, res, next) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// update an order
// not working right now
router.post('/orders/modify', async (req, res, next) => {
  try {
    const editedOrder = await updateOrderService(
      req.body._id,
      req.body.newData
    );
    res.json(editedOrder);
  } catch (err) {
    next(err);
  }
});

export default router;
