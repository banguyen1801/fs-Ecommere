import express from 'express';
const router = express.Router();
import { verify } from '../middleware/verifyToken.js';
import User from '../models/User.js';
import { verifyRefreshToken } from '../services/jwtServices.js';

import {
  registerUserService,
  loginUserService,
  deleteAllService,
} from '../services/authServices.js';

// Register
router.post('/register', async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  const savedUser = await registerUserService(
    req.body.name,
    req.body.email,
    req.body.password
  );
  res.send(savedUser);
});

// Login logic
router.post('/login', async (req, res) => {
  try {
    const [accessToken, refreshToken] = await loginUserService(
      req.body.email,
      req.body.password
    );
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST REQUEST
// PARAMS req.user._id
// return full info of a user who already had a valid JWT token
router.post('/users', verify, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  res.json(user);
});

// delete all user
router.post('/users/delete', async (req, res) => {
  await deleteAllService();
});

// this route is used for verifying requestToken and gain user a new JWT accessToken
// TODO: need to implement proper code to check refreshToken and sign new accessToken to user
// router.post('/token', async (req, res) => {
//   const newAccessToken = verifyRefreshToken(req.body);
//   res.json({ newAccessToken: newAccessToken });
// });
export default router;
