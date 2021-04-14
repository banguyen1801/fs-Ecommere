const router = require('express').Router();
const verify = require('./verifyToken.js');
const User = require('../models/User.js');

const { findUserByID } = require('../scripts/userAction.js');

// a private route that check for jwt
router.get('/', verify, async (req, res) => {
  const user = findUserByID(req.user._id);
  res.send(user);
});

module.exports = router;
