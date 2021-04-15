const config = require('../config');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ _id: user._id }, config.accessTokenSecret, {
    expiresIn: 60 * 60 * 24,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ _id: user._id }, config.refreshTokenSecret);
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
