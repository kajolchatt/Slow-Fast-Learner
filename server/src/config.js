const dotenv = require('./env');
const mysql = require('mysql');


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
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
