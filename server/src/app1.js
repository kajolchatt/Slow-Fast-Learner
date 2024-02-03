require("./mysql");
const express = require("express");
const con = require("./config");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
  res.send("Hello, this is the root endpoint!");
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await queryAsync("SELECT * FROM users WHERE username=?", [username]);

    if (result && result.length > 0) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
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
    const result = await queryAsync("SELECT * FROM users WHERE username=?", [username]);

    if (result && result.length > 0) {
      res.json("exist");
    } else {
      res.json("notexist");

      const insertResult = await queryAsync("INSERT INTO users SET ?", data);

      console.log("User inserted into MySQL:", insertResult);
      res.json("user inserted");
    }
  } catch (error) {
    console.error("Error in try-catch block:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    con.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.listen(8000, () => {
  console.log("port connected");
});
