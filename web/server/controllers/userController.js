const { User } = require("../models");
const { validatePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userFound = await User.findOne({
        where: {
          email,
        },
      });
      if (!userFound) {
        throw { name: "Invalid email/password" };
      }
      const isValidPassword = validatePassword(password, userFound.password);
      if (!isValidPassword) {
        throw { name: "Invalid email/password" };
      }
      const token = generateToken({
        id: userFound.id,
        email: userFound.email,
        role: userFound.role,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addAuthor(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const newAuthor = await User.create({
        username,
        email,
        password,
        role: "author",
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: `Author with email ${email} success to add`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
