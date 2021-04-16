const router = require('express').Router();
const verify = require('../scripts/verifyToken');
const User = require('../models/User');

// a private route with middleware that check for jwt token
router.get('/users', verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.send(user);
});

module.exports = router;
