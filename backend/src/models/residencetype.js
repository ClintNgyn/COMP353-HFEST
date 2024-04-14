"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResidenceType extends Model {}
  ResidenceType.init(
    {
      residenceType: {
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "ResidenceType",
      timestamps: false,
    },
  );
  return ResidenceType;
};
