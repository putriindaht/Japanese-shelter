const bcrypt = require("bcryptjs");

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = hashPassword;
