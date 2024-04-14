"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LivingTypes extends Model {}
  LivingTypes.init(
    {
      livingType: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "LivingTypes",
      timestamps: false,
    },
  );
  return LivingTypes;
};
