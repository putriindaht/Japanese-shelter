const express = require("express");
const router = express.Router();
const routerCategory = require("./category");
const routerPost = require("./post");

router.get("/", (req, res) => {
  res.send("Hello there, welcome to Japanese Shelter!");
});

router.use("/categories", routerCategory);
router.use("/posts", routerPost);

module.exports = router;
