const router = require('express').Router();
const verify = require('./verifyToken.js');
const User = require('../models/User.js');

// a private route that check for jwt
router.get('/', verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.send(user);
});

module.exports = router;
