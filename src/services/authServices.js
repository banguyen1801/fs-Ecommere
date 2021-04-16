const User = require('../models/User');

const {
  registerValidation,
  loginValidation,
} = require('../scripts/schemaValidation');

const { generateAccessToken, generateRefreshToken } = require('./jwtServices');

const { hashPassword, validatePassword } = require('../scripts/hashHandler');

// TODO: handling converting circular structure to JSON and Unhandled promise rejection
async function registerUserService(req, res) {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check uniqueness of user
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist');

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
    res.status(400).send(err);
  }
  return savedUser;
}

let refreshTokens = [];
async function loginUserService(req, res) {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = validatePassword(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is wrong');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
}

module.exports.registerUserService = registerUserService;
module.exports.loginUserService = loginUserService;
