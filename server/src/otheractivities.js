const con = require("./config");
// Switch to the slowfast database
con.query("USE slowfast", (err) => {
  if (err) {
    console.error("Error using database:", err.message);
    con.end(); // Close the connection if switching databases fails
    return;
  }

  console.log("Using slowfast database");

  // Create the ohteractivities table
  con.query(
    `CREATE TABLE IF NOT EXISTS otheractivities (
        USN VARCHAR(255) PRIMARY KEY,
        ACTIVITY INT,
        ACTIVITY_NAME VARCHAR(255),
        INTERNSHIP INT,
        INTERNSHIP_DOMAIN VARCHAR(255),
        FOREIGN KEY(USN)REFERENCES student(USN)ON DELETE CASCADE
        )`,
    (err, result) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      } else {
        console.log("otheractivities table created or already exists");
      }

      // Close the MySQL connection
      // con.end();
    }
  );
});








   