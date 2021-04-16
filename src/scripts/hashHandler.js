const bcrypt = require('bcryptjs');

async function hashPassword(rawPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(rawPassword, salt);
  return hashPassword;
}

async function validatePassword(rawPassword, hashedPassword) {
  return bcrypt.compare(rawPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  validatePassword,
};
