import mongoose from 'mongoose';

// Product: only women atm, no info about others such as men, girls and boys
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Product', productSchema);
