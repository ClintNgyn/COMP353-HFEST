"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "FacilityTypes",
      [
        { facilityType: "Hospital" },
        { facilityType: "CLSC" },
        { facilityType: "Clinic" },
        { facilityType: "Pharmacy" },
        { facilityType: "Special Installment" },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FacilityTypes", null, {});
  },
};
