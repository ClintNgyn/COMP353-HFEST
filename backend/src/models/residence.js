"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Residence extends Model {}
  Residence.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      residenceType: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: "ResidenceType",
          key: "residenceType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bedrooms: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      postalCode: {
        allowNull: false,
        type: DataTypes.STRING(7),
      },
      province: {
        allowNull: false,
        type: DataTypes.CHAR(2),
      },
      homePhone: {
        unique: true,
        type: DataTypes.STRING(25),
      },
    },
    {
      sequelize,
      modelName: "Residence",
      timestamps: false,
    },
  );
  return Residence;
};
