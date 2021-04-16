const mongoose = require('mongoose');

// Product: only women atm, no info about others such as men, girls and boys
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  categories: {
    type: [String],
    required: true,
    min: 1,
  },
  date_added: {
    type: Date,
    default: Date.now(),
  },
  //   brand: {
  //     type: String,
  //     min: 1,
  //   },
  //   size: {
  //     type: [Number, String],
  //     min: 1,
  //     required: true,
  //   },
  //   price: {
  //     type: Number,
  //     min: 0,
  //     required: true,
  //   },
  //   color: {
  //     type: String,
  //     min: 1,
  //     required: true,
  //   },
  //   status: {
  //     type: String,
  //     enum: ['In Stock', 'Out of Stock'],
  //   },
  //   sold: {
  //     type: Number,
  //     min: 0,
  //   },
  //   profit: {
  //     type: Number,
  //     min: 0,
  //   },
});

module.exports = mongoose.model('Product', productSchema);
