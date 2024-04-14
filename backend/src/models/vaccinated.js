"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vaccinated extends Model {}
  Vaccinated.init(
    {
      facilityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
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
      vaccineType: {
        primaryKey: true,
        type: DataTypes.STRING,
        references: {
          model: "VaccineTypes",
          key: "vaccineType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      doseNumber: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      vaccinationDate: {
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
      modelName: "Vaccinated",
      tableName: "Vaccinated",
      timestamps: false,
    },
  );
  return Vaccinated;
};
