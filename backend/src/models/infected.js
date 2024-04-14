"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Infected extends Model {}
  Infected.init(
    {
      personId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Person",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      infectionType: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        references: {
          model: "InfectionTypes",
          key: "infectionType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      infectionDate: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Infected",
      tableName: "Infected",
      timestamps: false,
    },
  );
  return Infected;
};
