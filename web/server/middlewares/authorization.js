const adminAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "author") {
      next();
    } else {
      throw { name: "Not authorized" };
    }
  } catch (err) {
    next(err);
  }
};
module.exports = adminAuthorization;
