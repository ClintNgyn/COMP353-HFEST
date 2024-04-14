"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Infected", {
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
      infectionType: {
        primaryKey: true,
        type: Sequelize.STRING(50),
        references: {
          model: "InfectionTypes",
          key: "infectionType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      infectionDate: {
        primaryKey: true,
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
    await queryInterface.dropTable("Infected");
  },
};
