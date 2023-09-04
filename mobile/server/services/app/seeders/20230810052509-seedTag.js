"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = require("../data/tag.json").map((tag) => {
      tag.createdAt = new Date();
      tag.updatedAt = new Date();
      return tag;
    });
    await queryInterface.bulkInsert("Tags", tags);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null);
  },
};
