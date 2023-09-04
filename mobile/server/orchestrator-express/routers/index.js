const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const UserController = require("../controllers/userController");
router.get("/", (req, res) => res.send("Hello there!"));

router.get("/posts", PostController.getPosts);
router.post("/posts", PostController.postOnePost);
router.delete("posts/:id", PostController.deleteOnePost);
router.get("/posts/:slug", PostController.getOnePost);
router.get("/users", UserController.getAllUser);
router.post("/users", UserController.postOneUser);
router.get("/users/:id", UserController.getOneUser);
module.exports = router;
