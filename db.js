// Import pg library, which provides functions for interacting with databases
const { Pool } = require("pg");

// Configure the connection Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employeEasy_db",
  password: "123456789ABC",
  port: 3001,
});

module.exports = pool;