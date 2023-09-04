const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function validatePassword(plainPass, hashPass) {
  return bcrypt.compareSync(plainPass, hashPass);
}
module.exports = { hashPassword, validatePassword };
