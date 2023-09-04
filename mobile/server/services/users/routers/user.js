const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.findAllUsers);
router.post("/", UserController.addUser);
router.get("/:id", UserController.findOneUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
