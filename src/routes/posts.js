const router = require('express').Router();
const verify = require('../utils/verifyToken');
const User = require('../models/User');

// a private route that check for jwt
router.get('/', verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.send(user);
});

module.exports = router;
