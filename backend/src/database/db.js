const { Sequelize } = require("sequelize");
const config = require("./config/config.js");

const env = process.env.NODE_ENV || "development";
const { username, password, database, host, dialect } = config[env];

const sequelizeDB = new Sequelize(database, username, password, { host, dialect });

module.exports = sequelizeDB;
