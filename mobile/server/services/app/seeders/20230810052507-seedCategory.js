"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../data/category.json").map((cat) => {
      cat.updatedAt = new Date();
      cat.createdAt = new Date();
      return cat;
    });
    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null);
  },
};
