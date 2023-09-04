const User = require("../model/user");
const hashPassword = require("../helpers/hashPassword");
class UserController {
  static async findAllUsers(req, res, next) {
    try {
      const users = (await User.findAll()).map((user) => {
        delete user.password;
        return user;
      });

      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findOneUser(req, res, next) {
    try {
      const { id } = req.params;
      console.log("Id user", id);
      const user = await User.findOne(id);
      if (!user) {
        throw {
          name: "not found",
          message: `User with id ${id} is not found`,
        };
      }
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const newUser = await User.insertOne({
        username,
        email,
        password: hashPassword(password),
        role,
        phoneNumber,
        address,
      });
      delete newUser.password;
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const userFound = await User.findOne(id);
      if (!userFound) {
        throw {
          name: "not found",
          message: `User with id ${id} is not found`,
        };
      }
      await User.deleteOne(userFound._id);
      res.status(200).json({
        message: `Sucess delete user ${id}`,
      });
    } catch (err) {
      console.log(err, "<<<<");
      next(err);
    }
  }
}

module.exports = UserController;
