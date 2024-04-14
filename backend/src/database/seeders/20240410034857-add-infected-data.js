"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const infectedData = [
      { personId: 1, infectionType: "COVID-19", infectionDate: "2022-04-10" }, //nurse
      { personId: 2, infectionType: "COVID-19", infectionDate: "2022-04-10" }, //nurse

      { personId: 3, infectionType: "COVID-19", infectionDate: "2022-04-10" },
      { personId: 4, infectionType: "COVID-19", infectionDate: "2022-04-10" },

      { personId: 5, infectionType: "COVID-19", infectionDate: "2022-04-10" }, //nurse
      { personId: 6, infectionType: "COVID-19", infectionDate: "2022-04-10" },

      //doctors
      { personId: 7, infectionType: "COVID-19", infectionDate: "2022-04-10" },
      { personId: 8, infectionType: "COVID-19", infectionDate: "2022-04-10" },
      { personId: 9, infectionType: "COVID-19", infectionDate: "2022-04-10" },

      { personId: 20, infectionType: "COVID-19", infectionDate: "2022-04-10" },
    ];

    await queryInterface.bulkInsert("Infected", infectedData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Infected", null, {});
  },
};
