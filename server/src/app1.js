const express = require("express");
const con = require("./config");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    con.query(
      "SELECT * FROM users WHERE username=?",
      [username],
      (err, result) => {
        if (err) {
          console.log("Error connecting to mysql query", err.message);
        }
        if (result.length > 0) {
          res.json("exist");
        } else {
          res.json("notexist");
        }
      }
    );
  } catch (error) {
    console.error("Error in try-catch block:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const data = {
    username: username,
    password: password,
  };

  try {
    con.query(
      "SELECT * FROM users WHERE username=?",
      [username],
      (err, result) => {
        if (err) {
          console.log("Error connecting to mysql query", err.message);
        }
        if (result.length > 0) {
          res.json("exist");
        } else {
          res.json("notexist");
          con.query(
            "INSERT INTO users SET ?",
            data,
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error(
                  "Error inserting user into MySQL:",
                  insertErr.message
                );
              } else {
                console.log("User inserted into MySQL:", insertResult);
                res.json("user inserted");
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error in try-catch block:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(8000, () => {
  console.log("port connected");
});
