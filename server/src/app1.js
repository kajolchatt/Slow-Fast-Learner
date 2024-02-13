const express = require("express");
const con = require("./config");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await queryAsync("SELECT * FROM users WHERE username=?", [
      username,
    ]);

    if (result && result.length > 0) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, userid, type } = req.body;
  const data = {
    username: username,
    password: password,
    userid: userid,
    type: type,
  };

  try {
    const checkResult = await queryAsync(
      "SELECT * FROM users WHERE username=?",
      [username]
    );

    if (checkResult && checkResult.length > 0) {
      res.json("exist");
    } else {
      await queryAsync("INSERT INTO users SET ?", data);
      console.log("User inserted into MySQL:", data);
      res.json("notexist");
    }
  } catch (error) {
    console.error("Error in signup:", error.message);
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

// *************************************HOMEPAGE*************************************************************************************
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { express, con, cors, app };
