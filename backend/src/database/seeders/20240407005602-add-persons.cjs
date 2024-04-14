"use strict";

const { faker } = require("@faker-js/faker/locale/en_CA");

/** @type {import('sequelize-cli').Migration} */
(module.exports = {
  async up(queryInterface, Sequelize) {
    const residenceIds = (
      await queryInterface.sequelize.query(
        `SELECT id FROM Residences;
        `,
        { type: Sequelize.QueryTypes.SELECT },
      )
    ).map((item) => item.id);

    const personData = [];
    for (let i = 0; i < 20; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      personData.push({
        firstName,
        lastName,
        occupation: faker.person.jobTitle(),
        mainResidenceId: faker.helpers.arrayElement(residenceIds),
        dob: faker.date.birthdate().toISOString().split("T")[0],
        ssn: faker.helpers.fromRegExp(/[0-9]{3}-[0-9]{3}-[0-9]{3}/),
        telephone: faker.phone.number(),
        email: faker.internet.email({ firstName, lastName }),
      });
    }

    await queryInterface.bulkInsert("Persons", personData, { ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Persons", null, {});
  },
});
