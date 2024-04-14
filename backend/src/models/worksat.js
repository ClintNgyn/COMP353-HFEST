"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WorksAt extends Model {
    static associate(models) {
      // employees+facilities: many-to-many
      this.belongsTo(models.Employee, {
        foreignKey: "employeeId",
        as: "workEmployeeDetails",
      });
      this.belongsTo(models.Facility, {
        foreignKey: "facilityId",
        as: "workFacilityDetails",
      });
    }
  }
  WorksAt.init(
    {
      employeeId: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        references: {
          model: "Employees",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      facilityId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Facilities",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      workRole: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "WorksAt",
      tableName: "WorksAt",
      timestamps: false,
    },
  );
  return WorksAt;
};
