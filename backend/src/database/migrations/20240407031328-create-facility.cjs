"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Facilities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      generalManager: {
        type: Sequelize.STRING(50),
        references: {
          model: "Employees",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      facilityName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      facilityType: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: "FacilityTypes",
          key: "facilityType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      telephone: {
        unique: true,
        type: Sequelize.STRING(25),
      },
      website: {
        unique: true,
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        type: Sequelize.STRING(50),
      },
    });

    // check unique facilities
    await queryInterface.sequelize.query(`
      ALTER TABLE Facilities
      ADD CONSTRAINT unique_facility
      UNIQUE (address, city, postalCode, province)
    `);

    // check that facility is contactable
    await queryInterface.sequelize.query(`
      ALTER TABLE Facilities
      ADD CONSTRAINT Facilities_check_contactable 
      CHECK (email IS NOT NULL OR telephone IS NOT NULL OR website IS NOT NULL);
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Facilities");
  },
};
