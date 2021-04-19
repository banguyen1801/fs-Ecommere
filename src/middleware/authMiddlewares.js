import { badRequest } from '../errors/ApiError.js';
import UserClass from '../models/User.js';
import RoleClass from '../models/Roles.js';
async function checkUserExist(req, res, next) {
  const email = req.body.email;
  const result = UserClass.findUserByEmail(email);
  if (result) return badRequest(res, 'Email Already Been Used');
  next();
}

async function isUserAdmin(req, res, next) {
  const roleId = req.user._id;
  const adminId = await RoleClass.getAdminId();
  if (roleId === adminId) next();
  else return badRequest(res, 'user is not admin');
}

export { checkUserExist };
