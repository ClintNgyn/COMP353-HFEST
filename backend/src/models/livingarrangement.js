"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LivingArrangement extends Model {}
  LivingArrangement.init(
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
      livingRelation: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "LivingTypes",
          key: "livingType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "LivingArrangement",
      timestamps: false,
    },
  );
  return LivingArrangement;
};
