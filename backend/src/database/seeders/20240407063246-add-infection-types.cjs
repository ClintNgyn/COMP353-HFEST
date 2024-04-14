"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "InfectionTypes",
      [
        { infectionType: "Covid-19" },
        { infectionType: "SARS-CoV" },
        { infectionType: "Ebola" },
        { infectionType: "Zika Virus" },
        { infectionType: "Yellow Fever" },
        { infectionType: "Common Flu" },
        { infectionType: "SARS-Cov-2 Variant" },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("InfectionTypes", null, {});
  },
};
