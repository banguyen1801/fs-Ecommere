import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import RoleClass from './Roles.js';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

class UserClass {
  constructor(name, email, password) {
    this.model = new User();
    this.model.name = name;
    this.model.email = email;
    this.model.password = password;
  }

  async save() {
    if (this.model.roles.length === 0) {
      this.model.roles = [await RoleClass.getUserId()];
      console.log(this.model.roles);
    }
    try {
      var savedUser = await this.model.save();
    } catch (err) {
      console.log(err);
    }
    return savedUser;
  }
  // return not undefined if user with {email} exist in database
  // findOne return null if not find in database
  static async findUserByEmail(email) {
    const result = await User.findOne({ email: email }).exec();
    return result;
  }

  // need to find out why the quest does not stop even after document was deleted
  static async deleteByEmail(email) {
    await User.deleteMany({ email: email });
  }
}

export default UserClass;
