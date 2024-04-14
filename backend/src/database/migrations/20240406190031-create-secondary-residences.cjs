"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SecondaryResidences", {
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
      residenceId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Residences",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SecondaryResidences");
  },
};
