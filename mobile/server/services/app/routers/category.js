const express = require("express");
const CategoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryDetail);
router.post("/add", CategoryController.addCategory);
router.put("/edit/:id", CategoryController.editCategory);
router.delete("/delete/:id", CategoryController.deleteCategory);
module.exports = router;
