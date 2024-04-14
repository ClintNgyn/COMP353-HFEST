"use strict";

const { faker } = require("@faker-js/faker/locale/en_CA");

/** @type {import('sequelize-cli').Migration} */
(module.exports = {
  async up(queryInterface, Sequelize) {
    const residenceTypes = (
      await queryInterface.sequelize.query(
        `SELECT residenceType FROM ResidenceTypes;
        `,
        { type: Sequelize.QueryTypes.SELECT },
      )
    ).map((item) => item.residenceType);

    const residenceData = [];
    for (let i = 0; i < 30; i++) {
      residenceData.push({
        residenceType: faker.helpers.arrayElement(residenceTypes),
        bedrooms: faker.number.int({ min: 2, max: 10 }),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        province: faker.location.state({ abbreviated: true }),
        homePhone: faker.phone.number(),
      });
    }

    await queryInterface.bulkInsert("Residences", residenceData, { ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Residences", null, {});
  },
});
