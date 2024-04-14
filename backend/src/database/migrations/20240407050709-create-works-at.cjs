"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WorksAt", {
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
      workRole: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
          model: "WorkRoles",
          key: "workRole",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      startAt: {
        primaryKey: true,
        type: Sequelize.DATE,
      },
      endAt: {
        type: Sequelize.DATE,
      },
    });

    // validate startAt < endAt
    // await queryInterface.sequelize.query(`
    // ALTER TABLE WorksAt
    // ADD CONSTRAINT WorksAt_chk_start_less_than_end
    // CHECK (startAt < endAt OR endAt IS NULL)
    // `);

    // ensure employee cannot work at conflicting times
    // await queryInterface.sequelize.query(`
    // CREATE TRIGGER CheckEmployeeAvailability
    // BEFORE INSERT ON WorksAt
    // FOR EACH ROW
    // BEGIN
    //     DECLARE max_end_date DATE;
    //     -- Check if the employee has any ongoing work without an end_date
    //     IF EXISTS (
    //         SELECT 1 FROM WorksAt
    //         WHERE employeeId = NEW.employeeId
    //         AND endAt IS NULL
    //     ) THEN
    //         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee is currently working at another facility.';
    //     END IF;

    //     -- Ensure new.start_date is greater than all previous end_dates for this employee
    //     SET max_end_date = (
    //         SELECT MAX(endAt) FROM WorksAt
    //         WHERE employeeId = NEW.employeeId
    //     );

    //     IF NEW.startAt <= max_end_date THEN
    //         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'New start date must be after all previous employment end dates.';
    //     END IF;
    //   END;

    // `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("WorksAt");
  },
};
