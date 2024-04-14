"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PersonCitizenship extends Model {}
  PersonCitizenship.init(
    {
      person_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Person",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      countryId: {
        type: DataTypes.CHAR(3),
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "PersonCitizenship",
      timestamps: false,
    },
  );
  return PersonCitizenship;
};
