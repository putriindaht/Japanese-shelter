const express = require("express");
const PostController = require("../controllers/postController");
const router = express.Router();

router.get("/", PostController.getPosts);
router.post("/", PostController.addPost);
router.get("/:slug", PostController.detailPost);
router.put("/:id", PostController.editPost);
router.delete("/:id", PostController.deletePost);
module.exports = router;
