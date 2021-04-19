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
// class ProductClass {
//   constructor({ name, categories }) {
//     console.log('name, categories', name, categories);
//     this.model = new Product();
//     this.model.name = name;
//     this.model.categories = categories;
//   }

//   async save() {
//     try {
//       var savedProduct = await this.model.save();
//     } catch (err) {
//       console.log(err);
//     }
//     return savedProduct;
//   }

//   static async findProductByName(name) {
//     const result = await Product.findOne({ name: name });
//     console.log(result);
//     return result;
//   }
//   static async findAllProduct() {
//     const result = await Product.find().exec();
//     console.log(result);
//     return result;
//   }
// }

// export default ProductClass;
