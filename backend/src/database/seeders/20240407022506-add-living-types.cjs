"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "LivingTypes",
      [
        { livingType: "Roommate" },
        { livingType: "Partner" },
        { livingType: "Siblings" },
        { livingType: "Child" },
        { livingType: "Parent" },
        { livingType: "Dependent" },
      ],
      { ignoreDuplicates: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LivingTypes", null, {});
  },
};
