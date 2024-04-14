"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FacilityTypes extends Model {}
  FacilityTypes.init(
    {
      facilityType: {
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "FacilityTypes",
      timestamps: false,
    },
  );
  return FacilityTypes;
};
