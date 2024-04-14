"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LivingArrangements", {
      employeeId: {
        primaryKey: true,
        type: Sequelize.STRING(50),
        references: {
          model: "Employees",
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
      livingRelation: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: "LivingTypes",
          key: "livingType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    // check that employee is not living with himself
    await queryInterface.sequelize.query(`
      CREATE TRIGGER prevent_self_living
      BEFORE INSERT ON LivingArrangements
      FOR EACH ROW
      BEGIN
          DECLARE employeePersonId INT;
          
          -- Assuming 'Employee' table has a 'person_id' column.
          SELECT personId INTO employeePersonId
          FROM Employees
          WHERE id = NEW.employeeId;
          
          -- Now compare this 'employeePersonId' with 'NEW.personId'.
          IF employeePersonId = NEW.personId THEN
              SIGNAL SQLSTATE '45000'
              SET MESSAGE_TEXT = 'An employee cannot live with themselves.';
          END IF;
      END;
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LivingArrangements");
  },
};
