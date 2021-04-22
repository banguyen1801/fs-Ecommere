import OrderItem from '../models/OrderItem.js';

import { orderItemCreationValidation } from '../scripts/schemaValidation.js';

import { OrderItemNotExistErr } from '../errors/ApiError.js';

// get all orderItem
async function getAllOrderItemsService() {
  const allOrderItems = await OrderItem.find({});
  return allOrderItems;
}
// create one orderItem
async function createOrderItemService(product_id, order_id) {
  const { error } = await orderItemCreationValidation({ product_id, order_id });
  if (error) throw new Error(error);

  const orderItem = new OrderItem({
    product_id,
    order_id,
  });
  try {
    var savedOrderItem = await orderItem.save();
  } catch (err) {
    throw new Error('500 unable to create new order');
  }
  return savedOrderItem;
}
// update one orderItem
async function updateOrderItemService(orderItem_id, newData) {
  if (!newData) throw new Error('no newData been passed in the body');

  const orderItemExist = await OrderItem.find({ orderItem_id }).exec();
  if (!orderItemExist) throw OrderItemNotExistErr();

  const updatedOrderItem = await OrderItem.findByIdAndUpdate(
    orderItem_id,
    newData,
    { new: true }
  );
  return updatedOrderItem;
}

// get OrderItem by Id
async function getOrderItemByIdService(orderItem_id) {
  const orderItem = await OrderItem.find({ _id: orderItem_id }).exec();
  if (!orderItem) throw OrderItemNotExistErr();
  return orderItem;
}
export {
  getAllOrderItemsService,
  createOrderItemService,
  getOrderItemByIdService,
  updateOrderItemService,
};
