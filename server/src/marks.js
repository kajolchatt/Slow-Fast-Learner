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
    `CREATE TABLE IF NOT EXISTS marks (
            USN VARCHAR(255) ,
            NAME VARCHAR(255) NOT NULL,
            SEM1 INTEGER DEFAULT 0,
            SEM2 INTEGER DEFAULT 0,
            SEM3 INTEGER DEFAULT 0,
            SEM4 INTEGER DEFAULT 0,
            SEM5 INTEGER DEFAULT 0,
            SEM6 INTEGER DEFAULT 0,
            SEM7 INTEGER DEFAULT 0,
            SEM8 INTEGER DEFAULT 0,
            SUB1 INTEGER DEFAULT 0,
            SUB2 INTEGER DEFAULT 0,
            SUB3 INTEGER DEFAULT 0,
            SUB4 INTEGER DEFAULT 0,
            SUB5 INTEGER DEFAULT 0,
            FOREIGN KEY (USN) REFERENCES STUDENT(USN)ON DELETE CASCADE,
            PRIMARY KEY(USN,NAME)
        )`,
    (err, result) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      } else {
        console.log("Users table created or already exists");
      }

      // Close the MySQL connection
      // con.end();
    }
  );
});