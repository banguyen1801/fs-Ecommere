const router = require('express').Router();
const User = require('../models/User.js');

const {
  registerValidation,
  loginValidation,
} = require('../scripts/schemaValidation.js');
const {
  generateAccessToken,
  generateRefreshToken,
  generateNewAccessToken,
} = require('../scripts/tokenGenerator.js');
const { hashPassword, validatePassword } = require('../scripts/hashHandler.js');
const { findUserByEmail } = require('../scripts/userAction.js');

// Register
router.post('/register', async (req, res) => {
  // Implementation of Joi validator
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check uniqueness of user
  const emailExist = findUserByEmail(req.body.email);
  if (emailExist) return res.status(400).send('Email already exist');

  // Hash password with bcryptjs
  const hashedPassword = hashPassword(req.body.password);

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login logic
let refreshTokens = [];
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = findUserByEmail(req.body.email);
  if (!user) return res.status(400).send('Email is not found');

  const validPass = validatePassword(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is wrong');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401);
  if (!refreshTokens.includes(refreshToken)) return res.status(403);
  generateNewAccessToken(refreshToken);
});
module.exports = router;
