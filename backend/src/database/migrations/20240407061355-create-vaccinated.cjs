"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vaccinated", {
      facilityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      personId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Persons",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      vaccineType: {
        primaryKey: true,
        type: Sequelize.STRING(50),
        references: {
          model: "VaccineTypes",
          key: "vaccineType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      doseNumber: {
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vaccinationDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Vaccinated");
  },
};
