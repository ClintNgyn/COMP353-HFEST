"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const secondaryResidencesData = [
      { personId: 7, residenceId: 2 }, // Assuming personId 7 has a secondary residence at residenceId 2
      { personId: 7, residenceId: 3 }, // Assuming personId 7 also has another secondary residence at residenceId 3
      { personId: 8, residenceId: 4 }, // Assuming personId 8 has a secondary residence at residenceId 4
      { personId: 8, residenceId: 5 }, // Assuming personId 8 also has another secondary residence at residenceId 5
      { personId: 9, residenceId: 6 }, // Assuming personId 9 has a secondary residence at residenceId 6
      { personId: 9, residenceId: 7 }, // Assuming personId 9 also has another secondary residence at residenceId 7
      // You can add more entries as needed
    ];
    await queryInterface.bulkInsert("SecondaryResidences", secondaryResidencesData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SecondaryResidences", null, {});
  },
};
