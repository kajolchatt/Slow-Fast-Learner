const con = require("./config");
// Switch to the slowfast database
con.query("USE slowfast", (err) => {
  if (err) {
    console.error("Error using database:", err.message);
    con.end(); // Close the connection if switching databases fails
    return;
  }

  console.log("Using slowfast database");

  // Create the student table
  con.query(
    `CREATE TABLE IF NOT EXISTS student (
            USN VARCHAR(255) PRIMARY KEY,
            NAME VARCHAR(255) NOT NULL,
            EMAIL VARCHAR(255) NOT NULL,
            PHONE_NUMBER VARCHAR(255) NOT NULL,
            BATCH INT NOT NULL,
            CURRENT_SEMESTER INT NOT NULL,
            SECTION CHAR(1),
            BACKLOG INT,
            FOREIGN KEY (USN) REFERENCES users(userid) ON DELETE CASCADE
        )`,
    (err, result) => {
      if (err) {
        console.error("Error creating student table:", err.message);
      } else {
        console.log("student table created or already exists");
      }

      // Close the MySQL connection
      // con.end();
    }
  );
});
