"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "VaccineTypes",
      [
        { vaccineType: "Pfizer" },
        { vaccineType: "Moderna" },
        { vaccineType: "AstraZeneca" },
        { vaccineType: "Johnson & Johnson" },
        { vaccineType: "Novavax" },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("VaccineTypes", null, {});
  },
};
