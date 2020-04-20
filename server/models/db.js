// const express = require("express");
// const app = express();
// const { Pool } = require("pg");

// require("dotenv").config();

// const dbHost = process.env.POSTGRES_HOST;
// const dbPort = process.env.POSTGRES_PORT;
// const dbUsername = process.env.POSTGRES_USERNAME;
// const dbPassword = process.env.POSTGRES_PASSWORD;
// const dbName = process.env.POSTGRES_DBNAME;
// const connectionString = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

// const User = sequelize.define(
//   "users",
//   {
//     accesscode: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     roomname: {
//       type: Sequelize.STRING,
//     },
//     username: {
//       type: Sequelize.STRING,
//     },
//   },
//   {
//     // options
//   }
// );

// User.sync({ force: true }).then(() => {
//   return User.create({
//     accesscode: "John",
//     roomname: "Hancock",
//     username: "GURU",
//   });
// });

// module.exports({});
