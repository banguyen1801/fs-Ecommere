import express from 'express';
const router = express.Router();

import {
  getAllOrdersService,
  createOrderService,
  getOrderByIdService,
  updateOrderService,
  advancedOrdersSearchService,
} from '../services/orderServices.js';

import { isUser, isAdmin } from '../middleware/verify.js';

// get all orders
router.get('/orders/all', isAdmin, async (req, res, next) => {
  try {
    const allOrders = await getAllOrdersService();
    res.json(allOrders);
  } catch (err) {
    next(err);
  }
});

// create an order
router.post('/orders', isUser, async (req, res, next) => {
  console.log(req.body.params);
  try {
    const newOrder = await createOrderService(
      req.body.params.user_id,
      req.body.params.items
    );
    res.json(newOrder);
  } catch (err) {
    next(err);
  }
});

// update an order
router.post('/orders/modify', isAdmin, async (req, res, next) => {
  try {
    const editedOrder = await updateOrderService(
      req.body.params.order_id,
      req.body.params.newData
    );
    res.json(editedOrder);
  } catch (err) {
    next(err);
  }
});

router.get('/orders/advanced', isAdmin, async (req, res, next) => {
  let value = {
    page: req.query.page,
  };

  try {
    const filteredOrder = await advancedOrdersSearchService(value);
    res.json(filteredOrder);
  } catch (err) {
    next(err);
  }
});

// get order by _id
router.get('/orders/:id', isAdmin, async (req, res, next) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
