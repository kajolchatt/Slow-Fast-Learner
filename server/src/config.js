const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kajol@123",
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