import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
export default mongoose.model('Role', roleSchema);

// class RoleClass {
//   constructor(name) {
//     this.model = new roleSchema();
//     this.model.name = name;
//   }
//   async save() {
//     try {
//       var savedRole = await this.model.save();
//     } catch (err) {
//       console.log(err);
//     }
//     return savedRole;
//   }

//   static async getUserId() {
//     const role = await Role.findOne({ name: 'user' });
//     return role._id;
//   }

//   static async getAdminId() {
//     const role = Role.findOne({ name: 'admin' });
//     return role._id;
//   }
// }

// export default RoleClass;
