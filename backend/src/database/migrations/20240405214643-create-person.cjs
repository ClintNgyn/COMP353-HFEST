"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Persons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mainResidenceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Residences",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      occupation: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      ssn: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        validate: {
          is: /^\d{3}-\d{3}-\d{3}$/,
        },
      },
      telephone: {
        type: Sequelize.STRING(25),
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    });

    // check that person is contactable
    await queryInterface.sequelize.query(`
      ALTER TABLE Persons 
      ADD CONSTRAINT Persons_check_contactable 
      CHECK (email IS NOT NULL OR telephone IS NOT NULL);
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Persons");
  },
};
