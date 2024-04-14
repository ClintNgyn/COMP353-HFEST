"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EmailLogs", {
      facilityId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      employeeId: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: "Employees",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        primaryKey: true,
        type: Sequelize.DATE,
      },
      subject: {
        primaryKey: true,
        type: Sequelize.STRING(50),
      },
      bodyPreview: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EmailLogs");
  },
};
