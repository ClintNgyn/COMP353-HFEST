"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Residences", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      residenceType: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "ResidenceTypes",
          key: "residenceType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bedrooms: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      postalCode: {
        allowNull: false,
        type: Sequelize.STRING(7),
      },
      province: {
        allowNull: false,
        type: Sequelize.CHAR(2),
      },
      homePhone: {
        unique: true,
        type: Sequelize.STRING(25),
      },
    });

    // check unique residences
    await queryInterface.sequelize.query(`
      ALTER TABLE Residences
      ADD CONSTRAINT unique_residence
      UNIQUE (address, city, postalCode, province)
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Residences");
  },
};
