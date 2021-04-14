const config = require('../config');
const router = require('express').Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const {
  registerValidation,
  loginValidation,
} = require('../scripts/schemaValidation.js');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../scripts/tokenGenerator.js');
const { hashPassword, validatePassword } = require('../scripts/hashHandler.js');

// Register
router.post('/register', async (req, res) => {
  // Implementation of Joi validator
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
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login logic
let refreshTokens = [];
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = validatePassword(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password is wrong');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401);
  if (!refreshTokens.includes(refreshToken)) return res.status(403);
  jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
    if (err) return res.status(403);
    const accessToken = generateAccessToken(user);
    res.json({ newAccessToken: accessToken, refreshToken: refreshToken });
  });
});
module.exports = router;
