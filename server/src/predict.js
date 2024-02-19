const con = require("./config");
con.query("USE slowfast", (err) => {
  if (err) {
    console.error("Error using database:", err.message);
    con.end(); // Close the connection if switching databases fails
    return;
  }
  console.log("using slowfast database");
  con.query(
    `CREATE TABLE IF NOT EXISTS predict(
        USN VARCHAR(255) NOT NULL PRIMARY KEY,
        PREDICT INT,
        FOREIGN KEY (USN) REFERENCES users(userid) ON DELETE CASCADE
  )`,
    (err, res) => {
      if (err) {
        console.error("Error creating users table:", err.message);
      } else {
        console.log("predict table created or already exists");
      }
    }
  );
});
