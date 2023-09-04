"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = require("../data/post.json").map((post) => {
      post.createdAt = new Date();
      post.updatedAt = new Date();
      return post;
    });
    await queryInterface.bulkInsert("Posts", posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null);
  },
};
