const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send('Access Denied');
  jwt.verify(token, config.accessTokenSecret, (err, user) => {
    if (err) return res.status(400).send('Has An Invalid Token');
    req.user = user;
    next();
  });
};
