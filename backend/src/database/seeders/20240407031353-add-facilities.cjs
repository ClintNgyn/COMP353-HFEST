"use strict";

const { faker } = require("@faker-js/faker/locale/en_CA");

/** @type {import('sequelize-cli').Migration} */
(module.exports = {
  async up(queryInterface, Sequelize) {
    const employeeIds = await queryInterface.sequelize.query(
      `SELECT id from Employees
      `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const facilityTypes = (
      await queryInterface.sequelize.query(
        `SELECT facilityType FROM FacilityTypes;
        `,
        { type: Sequelize.QueryTypes.SELECT },
      )
    ).map((item) => item.facilityType);

    const facilityData = [];
    for (let i = 0; i < 20; i++) {
      const facilityName = faker.company.name();
      const facilityType = faker.helpers.arrayElement(facilityTypes);

      facilityData.push({
        facilityName,
        facilityType,
        capacity: faker.number.int({ min: 50, max: 200 }),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        province: faker.location.state({ abbreviated: true }),
        telephone: faker.phone.number(),
        website: faker.internet.url(),
        email: faker.internet.email({ provider: `${facilityType}.ca` }),
      });
    }

    facilityData[0]["generalManager"] = employeeIds[0].id;
    facilityData[2]["generalManager"] = employeeIds[2].id;

    await queryInterface.bulkInsert("Facilities", facilityData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Facilities", null, {});
  },
});
