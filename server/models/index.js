const Sequelize = require("sequelize");

require("dotenv").config();

const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const dbUsername = process.env.POSTGRES_USERNAME;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DBNAME;
const connectionString = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const sequelize = new Sequelize(connectionString);

const models = {
  User: sequelize.import("./user"),
  Room: sequelize.import("./room"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
