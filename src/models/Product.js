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
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    popularity: {
      type: Number,
      default: 5,
    },
    imageUrl: {
      type: [String],
      default: ['https://i.ibb.co/GCCdy8t/womens.png'],
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
