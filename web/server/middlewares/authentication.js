const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw { name: "Not authenticated" };
    }

    const payload = verifyToken(access_token);
    if (!payload) {
      throw { name: "Not authenticated" };
    }

    const result = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    req.user = {
      id: result.id,
      email: result.email,
      role: result.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
