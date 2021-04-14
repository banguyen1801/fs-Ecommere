const bcrypt = require('bcryptjs');

async function hashPassword(rawPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(rawPassword, salt);
  return hashPassword;
}

async function validatePassword(rawPassword, hashedPassword) {
  const result = await bcrypt.compare(rawPassword, hashedPassword);
  return result;
}

module.exports.hashPassword = hashPassword;
module.exports.validatePassword = validatePassword;
