const User = require('../models/User.js');

async function findUserByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}

async function findUserByID(id) {
  const user = await User.findOne({ _id: id });
  return user;
}

module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserByID = findUserByID;
