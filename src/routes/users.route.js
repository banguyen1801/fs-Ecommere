import express from 'express';
import { badRequest } from '../errors/ApiError.js';
const router = express.Router();
import { verify, isUser, isAdmin } from '../middleware/verify.js';
import User from '../models/User.js';

import {
  registerUserService,
  loginUserService,
  deleteAllService,
  getAllUsersService,
  editUserService,
} from '../services/userServices.js';

// Register
router.post('/register', async (req, res, next) => {
  const value = {
    name: req.body.params.name,
    email: req.body.params.email,
    password: req.body.params.password,
    role: req.body.params.role,
  };
  try {
    const savedUser = await registerUserService(value);
    res.json(savedUser);
  } catch (err) {
    next(err);
  }
});

// Login logic
router.post('/login', async (req, res) => {
  try {
    const [accessToken, refreshToken, user] = await loginUserService(
      req.body.params.email,
      req.body.params.password
    );
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    });
  } catch (err) {
    throw badRequest();
  }
});

// get all users
router.get('/users', async (req, res) => {
  try {
    const allUser = await getAllUsersService();
    res.json(allUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// return full info of a user who already had a valid JWT token
router.post('/users', isAdmin, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  res.json(user);
});

//route to edit one user
router.post('/users/modify', async (req, res) => {
  try {
    const editedUser = await editUserService(
      req.body.params._id,
      req.body.params.newData
    );
    res.json(editedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// delete one user with email ben@gmail.com
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
