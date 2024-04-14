const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      // employee isa person
      this.hasOne(models.Employee, {
        foreignKey: "personId",
        as: "employeeDetails",
      });
    }
  }
  Person.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mainResidenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Residence",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      occupation: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      ssn: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      telephone: {
        type: DataTypes.STRING(25),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Person",
      tableName: "Persons",
      timestamps: false,
    },
  );
  return Person;
};
