"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      this.belongsTo(models.Person, {
        foreignKey: "personId",
        as: "personDetails",
      });

      // generalManager: 1-to-1
      this.hasOne(models.Facility, {
        foreignKey: "generalManager",
        as: "managedFacility",
      });

      // employees+facilities: many-to-many
      this.belongsToMany(models.Facility, {
        through: models.WorksAt,
        foreignKey: "employeeId",
        otherKey: "facilityId",
        as: "facilities",
      });
    }
  }
  Employee.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(50),
      },
      personId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "Person",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      medicareNum: {
        type: DataTypes.CHAR(12),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Employee",
      timestamps: false,
    },
  );
  return Employee;
};
