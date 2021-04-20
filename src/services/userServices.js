// import UserClass from '../models/User.js';
import User from '../models/User.js';
import Role from '../models/Roles.js';

import {
  registerValidation,
  loginValidation,
} from '../scripts/schemaValidation.js';

import { generateAccessToken, generateRefreshToken } from './jwtServices.js';

import { hashPassword, validatePassword } from '../scripts/hashHandler.js';

// register logic
async function registerUserService(name, email, password) {
  const { error } = registerValidation({ name, email, password });
  if (error) throw new Error(error.details[0].message);

  // Hash password with bcryptjs
  const hashedPassword = await hashPassword(password);

  const userRoleId = await Role.findOne({ name: 'user' }).exec();
  if (!userRoleId) throw new Error("User role haven't been created yet");

  const user = await User.findOne({ email: email }).exec();
  if (user) throw new Error('User already existed');
  const newUser = new User({
    name: name,
    email: email,
    roles: [userRoleId._id],
    password: hashedPassword,
  });

  try {
    var savedUser = await newUser.save();
  } catch (err) {
    throw new Error('Failed to create new user');
  }
  return savedUser;
}
// login logic
async function loginUserService(email, password) {
  const { error } = loginValidation({ email, password });
  if (error) return console.log(error);

  const user = await User.findOne({ email: email });
  if (!user) return console.log('Email is not found');

  const validPass = await validatePassword(password, user.password);
  if (!validPass) return console.log('Password is wrong');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return [accessToken, refreshToken];
}
// delete all users with email ben@gmail.com
async function deleteAllService() {
  await User.deleteOne({ email: 'ben@gmail.com' });
}

export { registerUserService, loginUserService, deleteAllService };
