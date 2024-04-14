"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ResidenceTypes",
      [
        { residenceType: "Apartment" },
        { residenceType: "House" },
        { residenceType: "Condo" },
        { residenceType: "Semi-Detached" },
        { residenceType: "Detached" },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ResidenceTypes", null, {});
  },
};
