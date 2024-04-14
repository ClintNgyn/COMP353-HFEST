"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SecondaryResidences extends Model {}
  SecondaryResidences.init(
    {
      personId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Persons",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      residenceId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Residences",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "SecondaryResidences",
      timestamps: false,
    },
  );
  return SecondaryResidences;
};
