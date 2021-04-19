// import UserClass from '../models/User.js';
import User from '../models/User.js';
import Role from '../models/Roles.js';

import {
  registerValidation,
  loginValidation,
} from '../scripts/schemaValidation.js';

import { generateAccessToken, generateRefreshToken } from './jwtServices.js';

import { hashPassword, validatePassword } from '../scripts/hashHandler.js';

import { userExistedErr } from '../errors/ApiError.js';

// TODO: handling converting circular structure to JSON and Unhandled promise rejection
async function registerUserService(name, email, password) {
  const { error } = registerValidation({ name, email, password });
  if (error) console.log(error.details[0].message);

  // Hash password with bcryptjs
  const hashedPassword = await hashPassword(password);

  const userRoleId = await Role.findOne({ name: 'user' }).exec();

  console.log(userRoleId._id);
  const user = await User.findOne({ email: email }).exec();
  if (user) throw userExistedErr(email);
  const newUser = new User({
    name: name,
    email: email,
    roles: [userRoleId._id],
    password: hashedPassword,
  });

  try {
    var savedUser = await newUser.save();
  } catch (err) {
    throw userExistedErr(email);
  }
  return savedUser;
}

// delete all users with email ben@gmail.com
async function deleteAllService() {
  await User.deleteOne({ email: 'ben@gmail.com' });
}

// FIX: there is an UnhandledPromiseRejectionWarning Type Error on validatePassword promise

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

export { registerUserService, loginUserService, deleteAllService };
