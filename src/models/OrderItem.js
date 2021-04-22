import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Product: only women atm, no info about others such as men, girls and boys
const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('OrderItem', orderItemSchema);
