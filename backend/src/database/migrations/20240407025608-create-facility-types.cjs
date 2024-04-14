"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FacilityTypes", {
      facilityType: {
        primaryKey: true,
        type: Sequelize.STRING(50),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FacilityTypes");
  },
};
