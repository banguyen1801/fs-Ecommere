import Order from '../models/Orders.js';

import { orderCreationValidation } from '../scripts/schemaValidation.js';

import { OrderNotExistErr } from '../errors/ApiError.js';
import mongoose from 'mongoose';
// get all order
async function getAllOrdersService() {
  const allOrders = await Order.find({}).exec();
  return allOrders;
}

// create one order
// FIX: user_id can't pass Joi validation test if
// destructed from req.body instead of passing directly with req.body.user_id
async function createOrderService(user_id, order_items, detail, total, status) {
  const { error } = await orderCreationValidation({
    user_id,
    order_items,
    detail,
    total,
    status,
  });
  if (error) throw new Error(error);
  console.log(user_id);
  const order = new Order({
    user_id: user_id,
    order_items,
    detail,
    total,
    status,
  });
  return order;
  //   const savedOrder = await order.save();
  //   return savedOrder;
}

// get order by id
async function getOrderByIdService(id) {
  const order = await Order.find({ _id: id }).exec();
  if (!order) throw OrderNotExistErr();

  return order;
}

// update order
// not working yet
async function updateOrderService(id, newData) {
  if (!newData) throw new Error('newData is no available');

  const orderExist = await Order.findOne({ _id: id }).exec();
  if (!orderExist) throw OrderNotExistErr();

  const updatedOrder = await Order.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedOrder;
}

export {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderService,
};
