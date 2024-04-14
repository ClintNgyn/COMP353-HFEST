"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmailLog extends Model {}
  EmailLog.init(
    {
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
      employeeId: {
        primaryKey: true,
        type: DataTypes.STRING,
        references: {
          model: "Employee",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        primaryKey: true,
        type: DataTypes.DATE,
      },
      subject: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      bodyPreview: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "EmailLog",
      timestamps: false,
    },
  );
  return EmailLog;
};
