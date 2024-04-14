"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VaccineTypes extends Model {}
  VaccineTypes.init(
    {
      vaccineType: {
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "VaccineTypes",
      timestamps: false,
    },
  );
  return VaccineTypes;
};
