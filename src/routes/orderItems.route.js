import express from 'express';
const router = express.Router();

import {
  getAllOrderItemsService,
  createOrderItemService,
  getOrderItemByIdService,
  updateOrderItemService,
} from '../services/orderItemServices.js';

// get all orderItem
router.get('/orderItems', async (req, res, next) => {
  try {
    const allOrderItems = await getAllOrderItemsService();
    res.json(allOrderItems);
  } catch (err) {
    next(err);
  }
});

// create an orderItem
router.post('/orderItems', async (req, res, next) => {
  try {
    const newOrderItem = await createOrderItemService(
      req.body.product_id,
      req.body.order_id
    );
    res.json(newOrderItem);
  } catch (err) {
    next(err);
  }
});

// update an orderItem
router.post('/orderItems/modify', async (req, res, next) => {
  try {
    const editedOrderItem = await updateOrderItemService(
      req.body.orderItem_id,
      req.body.newData
    );
    res.json(editedOrderItem);
  } catch (err) {
    next(err);
  }
});

// get orderItem by _id
router.get('/orderItems/:id', async (req, res, next) => {
  try {
    const orderItem = await getOrderItemByIdService(req.params.id);
    res.json(orderItem);
  } catch (err) {
    next(err);
  }
});

export default router;
