import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  detail: {
    type: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
    default: [],
  },
  total: {
    type: Number,
    default: 0,
  },
  // status: {
  //   type: String,
  //   enum: ['Completed', 'Pending', 'Canceled'],
  //   default: 'Pending',
  // },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Cart', cartSchema);
