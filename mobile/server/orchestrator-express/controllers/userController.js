const axios = require("axios");
const USER_SERVER_URL = process.env.USER_SERVER_URL;
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);

class UserController {
  static async getAllUser(req, res, next) {
    try {
      const userCache = await redis.get("users:users");
      if (userCache) {
        const users = JSON.parse(userCache);
        res.status(200).json(users);
      } else {
        console.log(USER_SERVER_URL + "/users");
        const { data: users } = await axios.get(USER_SERVER_URL + "/users");
        const isiredis = await redis.set("users:users", JSON.stringify(users));
        res.status(200).json(users);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const userCache = await redis.get("users:users");
      if (userCache) {
        const users = JSON.parse(userCache);
        const [foundUser] = users.filter((user) => user._id === id);
        if (foundUser) {
          return res.status(200).json(foundUser);
        }
      }
      const { data: user } = await axios.get(USER_SERVER_URL + "/users/" + id);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }

  static async postOneUser(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const { data: newUser } = await axios({
        method: "post",
        url: USER_SERVER_URL + "/users",
        data: {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      let currentUsers = await redis.get("users:users");
      currentUsers = JSON.parse(currentUsers);
      currentUsers.push(newUser);
      await redis.set("users:users", JSON.stringify(currentUsers));
      res.status(201).json({ message: "success add user id " + newUser._id });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteOneUser(req, res, next) {
    try {
      const { id } = req.params;
      const { data: user } = await axios({
        method: "delete",
        url: USER_SERVER_URL + "/users/" + id,
      });
      let currentUsers = await redis.get("users:users");
      const filteredUser = currentUsers.filter((user) => user._id !== id);
      await redis.set("users:users", JSON.stringify(filteredUser));
      res.status(200).json({
        message: "user deleted",
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = UserController;
