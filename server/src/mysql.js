const con = require("./config");
// Switch to the slowfast database
con.query("USE slowfast", (err) => {
  if (err) {
    console.error("Error using database:", err.message);
    con.end(); // Close the connection if switching databases fails
    return;
  }

  console.log("Using slowfast database");

  // Create the users table
  con.query(
    `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )`,
    (err, result) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      } else {
        console.log("Users table created or already exists");
      }

      // Close the MySQL connection
      con.end();
    }
  );
});