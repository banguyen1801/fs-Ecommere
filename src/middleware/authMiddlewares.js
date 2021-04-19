import { badRequest } from '../errors/ApiError.js';
import UserClass from '../models/User.js';
async function checkUserExist(req, res, next) {
  const email = req.body.email;
  const result = UserClass.findUserByEmail(email);
  if (result) return badRequest(res, 'Email Already Been Used');
  next();
}

export { checkUserExist };
