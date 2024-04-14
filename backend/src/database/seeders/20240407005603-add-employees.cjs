"use strict";

const { faker } = require("@faker-js/faker/locale/en_CA");

/** @type {import('sequelize-cli').Migration} */
(module.exports = {
  async up(queryInterface, Sequelize) {
    const personIds = await queryInterface.sequelize.query(
      `SELECT id from Persons ORDER BY id ASC
      `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const employeesData = [];
    for (let i = 0; i < 10; i++) {
      employeesData.push({
        id: personIds[i].id + 1000,
        personId: personIds[i].id,
        medicareNum: faker.helpers.fromRegExp(/[0-9]{12}/),
      });
    }

    await queryInterface.bulkInsert("Employees", employeesData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employees", null, {});
  },
});
