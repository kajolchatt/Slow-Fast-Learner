const express = require("express");
const con = require("./config");
const cors = require("cors");
const app = express();

const nodemailer = require("nodemailer");
const dotenv = require("./env");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const tomail = process.env.EMAIL_SEND;
const JWT_SECRET = process.env.JWT_SECRET;
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
  const { username, password } = req.body;

  try {
    const result = await queryAsync("SELECT * FROM users WHERE username=?", [
      username,
    ]);

    if (result && result.length > 0) {
      const isPasswordValid = await bcrypt.compare(
        password,
        result[0].password
      );
      if (isPasswordValid) {
        //Generate JWT token
        var token = jwt.sign({ username, type: result[0].type }, JWT_SECRET, {
          expiresIn: "1h",
        });
      }
      res.json({ token });
      // res.json("exist");
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
          // Hash the password before storing it
          const hashedPassword = await bcrypt.hash(password, 10);
          data.password = hashedPassword;

          //generate jwt token
          const token = jwt.sign({ username, type }, JWT_SECRET, {
            expiresIn: "1h",
          });
          await queryAsync("INSERT INTO users SET ?", data);
          console.log("User inserted into MySQL:", data);
          res.json({ token, message: "notexist" });
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
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;

        //generate jwt token
        const token = jwt.sign({ username, type }, JWT_SECRET, {
          expiresIn: "1h",
        });
        await queryAsync("INSERT INTO users SET ?", data);
        console.log("User inserted into MySQL:", data);
        res.json({ token, message: "notexist" });
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

// *******************************admin****************************************

app.post("/student", async (req, res, next) => {
  try {
    const { batchNumber } = req.body; // Extract batchNumber from request body

    // Process the batch number, you can perform database operations here
    console.log("Received batch number:", batchNumber);

    // Send a response indicating success
    res.status(200).json({ message: "Batch number received successfully" });
  } catch (error) {
    console.error("Error processing batch number:", error.message);
    // Send a response indicating failure
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/student", (req, res) => {
  try {
    const batchNumber = req.query.batchNumber; // Retrieve the batch number from query parameters
    console.log("Received batch number:", batchNumber);
    // Query the database to fetch student data filtered by batch number
    con.query(
      "SELECT * FROM student WHERE BATCH = ?",
      [batchNumber],
      (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  } catch (error) {
    console.error("Error retrieving student data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/prediction", (req, res) => {
  con.query(
    "SELECT P.USN,S.NAME,S.EMAIL,S.PHONE_NUMBER,P.PREDICT FROM student S,predict P WHERE P.USN=S.USN ",
    (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/fetch-existing-data", (req, res) => {
  const requestBody = req.body;
  res.json({ requestBody });
});
app.get("/fetch-existing-data", (req, res) => {
  const username = res.locals.requestBody;
  console.log(username);
  const sql = `SELECT 
    s.NAME, s.USN, s.PHONE_NUMBER, s.EMAIL, s.BATCH, s.CURRENT_SEMESTER, s.BACKLOG,
    p.NO_OF_PROJECT, p.PROJECT1, p.PROJECT2, p.PROJECT3, p.PROJECT4, p.PROJECT5,
    m.SEM1, m.SUB1, m.SUB2, m.SUB3, m.SUB4, m.SUB5,
    o.ACTIVITY_NAME, o.INTERNSHIP_DOMAIN
  FROM 
    student s
  JOIN 
    project p ON s.USN = p.USN
  JOIN 
    marks m ON s.USN = m.USN
  JOIN 
    otheractivities o ON s.USN = o.USN;
  `;

  con.query(sql, [username], (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).send("internal server error");
    } else {
      if (result.length > 0) {
        res.json({ result });
      } else {
        res.json({});
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = { express, con, cors, app, queryAsync };
