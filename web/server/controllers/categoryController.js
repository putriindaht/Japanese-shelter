const { response } = require("express");
const { Category } = require("../models");
class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  static async getCategoryDetail(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (err) {}
  }

  static async editCategory(req, res, next) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      await Category.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        },
      );
      res.status(201).json({
        message: `Category is updated to ${name}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const categoryFound = await Category.findByPk(id);
      if (!categoryFound) {
        throw { name: "Not Found" };
      }
      const deletedCategory = await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Category with id ${id} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = CategoryController;
