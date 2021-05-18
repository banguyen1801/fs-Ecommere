import jwt from 'jsonwebtoken';
import { badRequest } from '../errors/ApiError.js';

//take a user return a new JWT Token signed by user _id
export const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, roles: user.roles },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

//take a user return a new Refresh Token signed by user _id
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, roles: user.roles },
    process.env.REFRESH_TOKEN_SECRET
  );
};

//
export const decodeJwtAccessToken = async (token) => {
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (data) return data;
  } catch (error) {
    throw error;
  }
};

export const extractJwtToken = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) throw badRequest();
  return token;
};

//take a refreshtoken and return verified user which only has info of _id
export const verifyRefreshToken = (token) => {
  //TODO: refreshTokens needed to be stored somewhere so we can retrieve it
  //to check if the refreshToken that user have is the same as the one we store in our database
  //   if (!refreshTokens.includes(token)) return res.status(403);
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) throw new Error('RefreshToken not Valid');
    if (!err) return generateAccessToken(user);
  });
  return;
};
