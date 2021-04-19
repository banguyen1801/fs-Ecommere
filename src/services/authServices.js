import UserClass from '../models/User.js';

import {
  registerValidation,
  loginValidation,
} from '../scripts/schemaValidation.js';

import { generateAccessToken, generateRefreshToken } from './jwtServices.js';

import { hashPassword, validatePassword } from '../scripts/hashHandler.js';

import { badRequest, internal } from '../errors/ApiError.js';

// TODO: handling converting circular structure to JSON and Unhandled promise rejection
async function registerUserService(req, res) {
  const { error } = registerValidation(req.body);
  if (error) return badRequest(res, error.details[0].message);

  // Check uniqueness of user
  const user = await UserClass.findUserByEmail(req.body.email);
  if (user) return badRequest(res, 'Email already exist');

  // Hash password with bcryptjs
  const hashedPassword = await hashPassword(req.body.password);

  //  Create a new User
  const newUser = new UserClass(req.body.name, req.body.email, hashedPassword);
  await newUser.save();
  res.json(newUser);
}

// delete all users with email ben@gmail.com
async function deleteAllService() {
  await UserClass.deleteByEmail('ben@gmail.com');
}

// FIX: there is an UnhandledPromiseRejectionWarning Type Error on validatePassword promise
let refreshTokens = [];
async function loginUserService(req, res) {
  const { error } = loginValidation(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const user = await UserClass.findUserByEmail(req.body.email);
  if (!user) return badRequest(res, 'Email is not found');

  const validPass = await validatePassword(req.body.password, user.password);
  if (!validPass) return badRequest(res, 'Password is wrong');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  return [accessToken, refreshToken];
}

export { registerUserService, loginUserService, deleteAllService };
