import jwt from 'jsonwebtoken';
import { badRequest } from '../errors/ApiError.js';
import { extractJwtToken } from '../services/jwtServices.js';

// request headers got format Authorization: `Bearer ${jwtToken}`
export async function verify(req, res, next) {
  try {
    const token = extractJwtToken(req);
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const token = extractJwtToken(req);
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user.roles.includes('admin')) throw badRequest();
    if (user.roles.includes('admin')) {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const isUser = async (req, res, next) => {
  try {
    const token = extractJwtToken(req);
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!user.roles.includes('user')) throw badRequest();
    if (user.roles.includes('user')) {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};
