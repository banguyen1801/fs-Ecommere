import Order from '../models/Order.js';

import { orderCreationValidation } from '../scripts/schemaValidation.js';

import { OrderNotExistErr } from '../errors/ApiError.js';

// get all orders
async function getAllOrdersService() {
  const allOrders = await Order.find({});
  return allOrders;
}

// create one order
async function createOrderService(user_id, items) {
  const { error } = await orderCreationValidation({ user_id, items });
  if (error) throw new Error(error);
  const order = new Order({
    user_id,
    items,
  });
  try {
    var savedOrder = await order.save();
  } catch (err) {
    throw new Error(`unable to create new order with user_id ${user_id}`);
  }
  return savedOrder;
}

// update one order
async function updateOrderService(order_id, newData) {
  const orderExist = await Order.findOne({
    _id: order_id,
    status: 'Pending',
  }).exec();

  if (!orderExist)
    throw new Error(
      `Order id ${order_id} does not existed or order status is not Pending`
    );

  const updatedOrder = await Order.findByIdAndUpdate(order_id, newData, {
    new: true,
  });
  return updatedOrder;
}

async function advancedOrdersSearchService({ page }) {
  const filteredOrder = await Order.find({})

    .skip((page - 1) * 10)
    .limit(10)
    .exec();

  const count = await Order.find({}).countDocuments();
  if (!filteredOrder) throw new Error("Orders doesn't exist");

  return { order: filteredOrder, maxPage: Math.ceil(count / 10) };
}

// getOrderByIdService
async function getOrderByIdService(id) {
  const order = await Order.findById(id).exec();
  if (!order) throw new Error(`Order with id ${id} does not exist`);
  return order;
}

export {
  getAllOrdersService,
  createOrderService,
  getOrderByIdService,
  updateOrderService,
  advancedOrdersSearchService,
};
