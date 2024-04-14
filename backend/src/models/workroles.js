"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorkRoles extends Model {}
  WorkRoles.init(
    {
      workRole: {
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "WorkRoles",
      timestamps: false,
    },
  );
  return WorkRoles;
};
