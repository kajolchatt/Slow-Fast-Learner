const express = require("express");
const con = require("./config");
const cors = require("cors");
const app = express();

const nodemailer = require("nodemailer");
const dotenv=require("./env")

const user=process.env.EMAIL_USER;
const pass=process.env.EMAIL_PASS;
const tomail=process.env.EMAIL_SEND;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//OTP GENERATION ROUTE
let responsesReceived = 0;
const otpStorage = {};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

app.post("/generate-otp", async (req, res) => {
  console.log("before otp generation");
  try {
    const { type } = req.body;
    console.log("type is", type);
    if (type === "Admin") {
      const otp = Math.floor(100000 + Math.random() * 900000);
      otpStorage[type] = otp;

      const mailOptions = {
        from: user,
        to: tomail,
        subject: "Admin Signup OTP",
        text: `The OTP for admin signup is ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      res.json("success");
    }
  } catch (error) {
    console.error("Error generating and sending otp", error.message);
    res.status(500).json({ error: "failed to generate and send otp" });
  }
});

//LOGIN ROUTE
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

//SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  const { username, password, userid, type, OTP } = req.body;
  const data = {
    username: username,
    password: password,
    userid: userid,
    type: type,
  };

  console.log("otp sent is", OTP);
  console.log("otpStorage[otp] is", otpStorage[type]);
  try {
    if (type === "Admin") {
      if (otpStorage[type] && OTP === otpStorage[type]) {
        delete otpStorage[type];
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
        console.log(`Admin signup details:${username}, ${password}, ${userid}`);
      } else {
        res.status(401).json({ error: "invalid OTP" });
      }
    } else {
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
