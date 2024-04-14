"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfectionTypes extends Model {}
  InfectionTypes.init(
    {
      infectionType: {
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "InfectionTypes",
      timestamps: false,
    },
  );
  return InfectionTypes;
};
