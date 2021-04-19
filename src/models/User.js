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

export default mongoose.model('User', userSchema);
