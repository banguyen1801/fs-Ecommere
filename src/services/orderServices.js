import Order from '../models/Order.js';

import { orderCreationValidation } from '../scripts/schemaValidation.js';

import { OrderNotExistErr } from '../errors/ApiError.js';

// get all orders
async function getAllOrdersService() {
  const allOrders = await Order.find({});
  return allOrders;
}

// create one order
async function createOrderService(user_id, detail) {
  console.log(user_id, detail);
  const { error } = await orderCreationValidation({ user_id, detail });
  if (error) throw new Error(error);
  const order = new Order({
    user_id,
    detail,
  });
  try {
    var savedOrder = await order.save();
  } catch (err) {
    throw new Error('unable to create new order');
  }
  return savedOrder;
}

// update one order
async function updateOrderService(order_id, newData) {
  if (!newData) throw new Error('newData is not available');
  console.log(order_id, newData);
  const orderExist = await Order.find({ _id: order_id }).exec();

  if (!orderExist) throw OrderNotExistErr();

  const updatedOrder = await Order.findByIdAndUpdate(order_id, newData, {
    new: true,
  });
  return updatedOrder;
}

// getOrderByIdService
async function getOrderByIdService(id) {
  const order = await Order.find({ _id: id }).exec();
  if (!order) throw OrderNotExistErr();
  return order;
}

export {
  getAllOrdersService,
  createOrderService,
  getOrderByIdService,
  updateOrderService,
};
