import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Product: only women atm, no info about others such as men, girls and boys
const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  order_id: {
    type: { type: Schema.Types.ObjectId, ref: 'Order' },
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('OrderItem', orderItemSchema);
