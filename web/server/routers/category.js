const express = require("express");
const CategoryController = require("../controllers/categoryController");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const adminAuthorization = require("../middlewares/authorization");

router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryDetail);
router.use(authentication);
router.use(adminAuthorization);
router.post("/add", CategoryController.addCategory);
router.put("/edit/:id", CategoryController.editCategory);
router.delete("/delete/:id", CategoryController.deleteCategory);
module.exports = router;
