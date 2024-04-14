"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "WorkRoles",
      [
        { workRole: "Doctor" },
        { workRole: "Nurse" },
        { workRole: "Cashier" },
        { workRole: "Pharmacist" },
        { workRole: "Receptionist" },
        { workRole: "Administrative Duties" },
        { workRole: "Security Personnel" },
        { workRole: "Regular Employee" },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorkRoles", null, {});
  },
};
