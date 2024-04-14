"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scheduled extends Model {}
  Scheduled.init(
    {
      employeeId: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        references: {
          model: "Employee",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      facilityId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Facility",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      workRole: {
        allowNull: false,
        type: DataTypes.STRING(50),
        references: {
          model: "WorkRoles",
          key: "workRole",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      startAt: {
        primaryKey: true,
        type: DataTypes.DATE,
      },
      endAt: {
        type: DataTypes.DATE,
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
      modelName: "Scheduled",
      tableName: "Scheduled",
      timestamps: false,
    },
  );
  return Scheduled;
};
