"use strict";

const dayjs = require("dayjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const worksAtData = [
      { employeeId: 1001, facilityId: 1, startAt: "2023-01-01 00:00:00", endAt: "2023-01-02 00:00:00", workRole: "Nurse" },
      { employeeId: 1001, facilityId: 1, startAt: "2023-01-03 00:00:00", endAt: "2023-01-04 00:00:00", workRole: "Nurse" },
      { employeeId: 1001, facilityId: 1, startAt: "2023-01-05 00:00:00", endAt: null, workRole: "Nurse" },

      { employeeId: 1002, facilityId: 2, startAt: "2023-02-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Nurse" },
      { employeeId: 1002, facilityId: 2, startAt: "2023-03-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Nurse" },

      { employeeId: 1003, facilityId: 3, startAt: "2023-04-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Pharmacist" },
      { employeeId: 1004, facilityId: 4, startAt: "2023-05-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Receptionist" },
      { employeeId: 1005, facilityId: 4, startAt: "2023-05-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Nurse" },
      { employeeId: 1006, facilityId: 4, startAt: "2023-05-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Cashier" },
      //doctors
      { employeeId: 1007, facilityId: 5, startAt: "2023-05-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Doctor" },
      { employeeId: 1008, facilityId: 6, startAt: "2023-05-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Doctor" },
      { employeeId: 1009, facilityId: 7, startAt: "2023-05-01 00:00:00", endAt: "2023-12-31 00:00:00", workRole: "Doctor" },
    ];
    await queryInterface.bulkInsert("WorksAt", worksAtData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("WorksAt", null, {});
  },
};
