import config from '../config/index.js';
import jwt from 'jsonwebtoken';

//take a user return a new JWT Token signed by user _id
function generateAccessToken(user) {
  return jwt.sign(
    { _id: user._id, roles: user.roles },
    config.accessTokenSecret,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
}

//take a user return a new Refresh Token signed by user _id
function generateRefreshToken(user) {
  return jwt.sign(
    { _id: user._id, roles: user.roles },
    config.refreshTokenSecret
  );
}

//take a refreshtoken and return verified user which only has info of _id
function verifyRefreshToken(token) {
  //TODO: refreshTokens needed to be stored somewhere so we can retrieve it
  //to check if the refreshToken that user have is the same as the one we store in our database
  //   if (!refreshTokens.includes(token)) return res.status(403);
  jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
    if (err) throw new Error('RefreshToken not Valid');
    if (!err) return generateAccessToken(user);
  });
  return;
}

export { generateAccessToken, generateRefreshToken, verifyRefreshToken };
