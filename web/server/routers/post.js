const express = require("express");
const PostController = require("../controllers/postController");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const adminAuthorization = require("../middlewares/authorization");

router.get("/", PostController.getPosts);
router.get("/:slug", PostController.detailPost);
router.use(authentication);
router.use(adminAuthorization);
router.post("/add", PostController.addPost);
router.put("/edit/:id", PostController.editPost);
router.delete("/delete/:id", PostController.deletePost);
module.exports = router;
