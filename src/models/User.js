import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { getUserRoleId } from '../services/roleServices.js';

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
    type: [String],
    default: ['user'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);
