"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Scheduled", {
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
        allowNull: false,
        type: Sequelize.STRING(50),
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
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.sequelize.query(`

    CREATE PROCEDURE PrepareAndSendSchedules()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE f_id INT;
  DECLARE f_name VARCHAR(255);
  DECLARE f_address VARCHAR(255);
  DECLARE e_id INT;
  DECLARE e_first VARCHAR(255);
  DECLARE e_last VARCHAR(255);
  DECLARE e_email VARCHAR(255);
  DECLARE e_role VARCHAR(255);
  DECLARE cur CURSOR FOR 
    SELECT f.facility_id, f.facility_name, f.address,
           e.employee_id, e.first_name, e.last_name, e.email, r.role_name
    FROM facilities f
    JOIN schedules s ON f.facility_id = s.facility_id
    JOIN employees e ON s.employee_id = e.employee_id
    JOIN roles r ON s.role_id = r.role_id;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur;

  read_loop: LOOP
    FETCH cur INTO f_id, f_name, f_address, e_id, e_first, e_last, e_email, e_role;
    IF done THEN
      LEAVE read_loop;
    END IF;
    
    INSERT INTO EmailLog (facility_id, employee_id, subject, body_preview)
    VALUES (f_id, e_id, 'Schedule' ,JSON_OBJECT('facility_name', f_name, 'address', f_address, 
                                    'first_name', e_first, 'last_name', e_last,
                                    'email', e_email, 'role', e_role));
  END LOOP;

  CLOSE cur;
END;

    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Scheduled");
  },
};
