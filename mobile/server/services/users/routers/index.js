const express = require("express");
const router = express.Router();
const userRouter = require("./user");

router.get("/", (req, res) => res.send("Hello there!"));
router.use("/users", userRouter);

module.exports = router;
