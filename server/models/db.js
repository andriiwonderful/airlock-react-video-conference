const express = require('express');
const app = express();
const {Pool} = require('pg')

require('dotenv').config();

const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const dbUsername = process.env.POSTGRES_USERNAME;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DBNAME;
const connectionString = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool ({
    user: dbUsername,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: dbName
})

module.exports = pool