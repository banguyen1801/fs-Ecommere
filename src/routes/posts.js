import express from 'express';
const router = express.Router();
import { verify } from '../services/verifyToken.js';
import UserClass from '../models/User.js';

// a private route with middleware that check for jwt token
router.get('/users', verify, async (req, res) => {
  const user = await UserClass.findOne({ _id: req.user._id }).exec();
  res.send(user);
});

export default router;
