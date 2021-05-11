import mongoose from 'mongoose';

// Product: only women atm, no info about others such as men, girls and boys
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    size: {
      type: [String],
    },
    price: {
      type: Number,
    },
    color: {
      type: [String],
    },
    stock: {
      type: Number,
    },
    categories: {
      type: [String],
    },
    popularity: {
      type: Number,
      default: 5,
    },
    imageUrl: {
      type: [String],
      default: ['https://i.ibb.co/GCCdy8t/womens.png'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
