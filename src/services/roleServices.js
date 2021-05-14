import Role from '../models/Role.js';
// all service unused atm
export const getRoleNameByRoleId = async (roleId) => {
  const role = await Role.findById(roleId);
  return role.name;
};

export const getRoleIdByRoleName = async (roleName) => {
  const role = await Role.findOne({ name: roleName });
  return role._id;
};

export const getAdminRoleId = async () => {
  const role = await Role.findOne({ name: 'admin' });
  return role._id;
};
export const getUserRoleId = async () => {
  const role = await Role.findOne({ name: 'user' });
  return role._id;
};
