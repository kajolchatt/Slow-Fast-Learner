const mysql = require("mysql");
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: "slowfast",
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }

  console.log("Connected to MySQL server");
});
module.exports = con;