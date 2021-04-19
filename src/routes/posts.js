import express from 'express';
const router = express.Router();
import { verify } from '../middleware/verifyToken.js';
import UserClass from '../models/User.js';

// a private route with middleware that check for jwt token
router.get('/users', verify, async (req, res) => {
  const user = await UserClass.findUserById(req.user._id);
  res.send(user);
});

export default router;
