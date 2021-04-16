const config = require('../config');
const jwt = require('jsonwebtoken');
const { badRequest } = require('../errors/ApiError');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return badRequest(res, 'Access Denied');
  jwt.verify(token, config.accessTokenSecret, (err, user) => {
    if (err) return badRequest(res, 'Has An Invalid Token');
    req.user = user;
    next();
  });
};
