const User = require('../models/User');
const bcrypt = require('bcryptjs');

const {
  registerValidation,
  loginValidation,
} = require('../scripts/schemaValidation');

const { generateAccessToken, generateRefreshToken } = require('./jwtServices');

const { hashPassword, validatePassword } = require('../scripts/hashHandler');

const { badRequest, internal } = require('../errors/ApiError');

// TODO: handling converting circular structure to JSON and Unhandled promise rejection
async function registerUserService(req, res) {
  const { error } = registerValidation(req.body);
  if (error) return badRequest(res, error.details[0].message);

  // Check uniqueness of user
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return badRequest(res, 'Email already exist');

  // Hash password with bcryptjs
  const hashedPassword = await hashPassword(req.body.password);

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashedPassword,
  });
  try {
    var savedUser = await user.save();
  } catch (err) {
    badRequest(res, err.message);
  }
  return savedUser;
}

// FIX: there is an UnhandledPromiseRejectionWarning Type Error on validatePassword promise
let refreshTokens = [];
async function loginUserService(req, res) {
  const { error } = loginValidation(req.body);
  if (error) return badRequest(res, error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return badRequest(res, 'Email is not found');

  const validPass = await validatePassword(req.body.password, user.password);
  if (!validPass) return badRequest(res, 'Password is wrong');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  return [accessToken, refreshToken];
}

module.exports = { registerUserService, loginUserService };
