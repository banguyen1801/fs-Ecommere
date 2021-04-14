const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
}

function generateNewAccessToken(refreshToken) {
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    const accessToken = generateAccessToken(user);
    res.json({ newAccessToken: accessToken, refreshToken: refreshToken });
  });
}
module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.generateNewAccessToken = generateNewAccessToken;
