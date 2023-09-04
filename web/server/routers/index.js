const express = require("express");
const router = express.Router();
const routerCategory = require("./category");
const routerPost = require("./post");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const adminAuthorization = require("../middlewares/authorization");
router.get("/", (req, res) => {
  res.send("Hello there, welcome to Japanese Shelter!");
});

router.post("/login", UserController.login);

router.post(
  "/add-author",
  authentication,
  adminAuthorization,
  UserController.addAuthor,
);

router.use("/categories", routerCategory);
router.use("/posts", routerPost);

module.exports = router;
