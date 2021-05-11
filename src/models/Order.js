import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// Product: only women atm, no info about others such as men, girls and boys
const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [],
      default: [],
    },
    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Canceled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
