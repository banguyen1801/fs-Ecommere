import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model('Role', roleSchema);

class RoleClass {
  constructor(name) {
    this.model = new roleSchema();
    this.model.name = name;
  }

  static async getUserId() {
    const role = await Role.findOne({ name: 'user' });
    return role._id;
  }

  static getAdminId() {
    const role = Role.findOne({ name: 'admin' });
    return role._id;
  }
}

export default RoleClass;
