"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    static associate(models) {
      // generalManager: 1-to-1
      this.belongsTo(models.Employee, {
        foreignKey: "generalManager",
        targetKey: "id",
        as: "generalManagerDetails",
      });

      // employees+facilities: many-to-many
      this.belongsToMany(models.Employee, {
        through: models.WorksAt,
        foreignKey: "facilityId",
        otherKey: "employeeId",
        as: "employees",
      });
    }
  }
  Facility.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      generalManager: {
        type: DataTypes.STRING(50),
        references: {
          model: "Employee",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      facilityName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      facilityType: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "FacilityTypes",
          key: "facilityType",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      telephone: {
        unique: true,
        type: DataTypes.STRING(25),
      },
      website: {
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        unique: true,
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "Facility",
      timestamps: false,
    },
  );
  return Facility;
};
