import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Product: only women atm, no info about others such as men, girls and boys
const orderSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order_items: {
    type: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    default: [],
  },
  detail: {
    type: String,
    default: '',
  },
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Canceled'],
    default: 'Pending',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Order', orderSchema);
