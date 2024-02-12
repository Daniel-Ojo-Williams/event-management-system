require("dotenv/config");

let database = process.env.DATABASE;
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let dialect = process.env.DB_DIALECT;
let connectioniString = process.env.DB_CONNECTION_STRING;

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
