"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const personId = await queryInterface.sequelize.query(
      `SELECT id from Persons ORDER BY id ASC
      `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    const vaccinatedData = [
      { facilityId: 1, personId: 1, vaccineType: "Pfizer", doseNumber: 1, vaccinationDate: "2021-01-15" },
      { facilityId: 1, personId: 1, vaccineType: "Pfizer", doseNumber: 2, vaccinationDate: "2021-02-12" },
      { facilityId: 2, personId: 2, vaccineType: "Moderna", doseNumber: 1, vaccinationDate: "2021-01-20" },
      { facilityId: 2, personId: 2, vaccineType: "Moderna", doseNumber: 2, vaccinationDate: "2021-02-17" },
      { facilityId: 1, personId: 3, vaccineType: "AstraZeneca", doseNumber: 1, vaccinationDate: "2021-03-01" },
      { facilityId: 3, personId: 4, vaccineType: "Johnson & Johnson", doseNumber: 1, vaccinationDate: "2021-03-15" },

      { facilityId: 2, personId: 5, vaccineType: "Pfizer", doseNumber: 1, vaccinationDate: "2021-03-20" },
      { facilityId: 2, personId: 5, vaccineType: "Pfizer", doseNumber: 2, vaccinationDate: "2021-04-16" },

      { facilityId: 1, personId: 20, vaccineType: "Moderna", doseNumber: 1, vaccinationDate: "2021-04-25" },
      { facilityId: 1, personId: 20, vaccineType: "Moderna", doseNumber: 2, vaccinationDate: "2021-05-23" },
    ];
    await queryInterface.bulkInsert("Vaccinated", vaccinatedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vaccinated", null, {});
  },
};
