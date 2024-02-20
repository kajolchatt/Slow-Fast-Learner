require("./app1");
const { express, con, cors, app, queryAsync } = require("./app1");
app.use(cors());
app.use(express.json());
let responsesReceived = 0;

app.post("/home", async (req, res) => {
  console.log(req.body);
  const usn = req.body.usn;
  const name = req.body.name;
  const email = req.body.email;
  const pno = req.body.pno;
  const batch = req.body.batch;
  const sem = req.body.sem;
  const section = req.body.section;
  const sem1 = req.body.sem1;
  const sub1 = req.body.sub1;
  const sub2 = req.body.sub2;
  const sub3 = req.body.sub3;
  const sub4 = req.body.sub4;
  const sub5 = req.body.sub5;
  const numberOfProjects = req.body.numberOfProjects;
  const project1 = req.body.project1;
  const project2 = req.body.project2;
  const project3 = req.body.project3;
  const project4 = req.body.project4;
  const project5 = req.body.project5;
  const activity = req.body.activity;
  const internship = req.body.internship;
  const internshipName = req.body.internshipName;
  const activityName = req.body.activityName;
  const backlog = req.body.backlog;
  let responsesReceived = 0;

  function sendResponseIfFinished() {
    responsesReceived++;
    if (responsesReceived === 5) {
      // Assuming you have four queries
      res.send("values inserted");
    }
  }

  const existingStudent = await queryAsync(
    "SELECT * FROM student WHERE USN=?",
    [usn]
  );

  if (existingStudent.length > 0) {
    con.query(
      "UPDATE marks SET SEM1=?,SUB1=?,SUB2=?,SUB3=?,SUB4=?,SUB5=? WHERE USN=?",
      [sem1, sub1, sub2, sub3, sub4, sub5, usn],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );

    // con.query("UPDATE predict set PREDICT=? WHERE USN=?",[prediction,usn])
    con.query(
      "UPDATE student SET CURRENT_SEMESTER=?,BACKLOG=? WHERE USN=?",
      [sem, backlog, usn],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );

    con.query(
      "UPDATE project SET NO_OF_PROJECT=?,PROJECT1=?,PROJECT2=?,PROJECT3=?,PROJECT4=?,PROJECT5 =? WHERE USN=?",
      [numberOfProjects, project1, project2, project3, project4, project5, usn],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );

    con.query(
      "UPDATE otheractivities SET ACTIVITY=?,ACTIVITY_NAME=?,INTERNSHIP=?,INTERNSHIP_DOMAIN=? WHERE USN=?",
      [activity, activityName, internship, internshipName, usn],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
    res.send("values updated");
  } else {
    con.query(
      "INSERT INTO student (USN,NAME,EMAIL,PHONE_NUMBER,BATCH,SECTION,CURRENT_SEMESTER,BACKLOG) VALUES (?,?,?,?,?,?,?,?)",
      [usn, name, email, pno, batch, section, sem, backlog],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          sendResponseIfFinished();
        }
      }
    );
    con.query(
      "INSERT INTO marks (USN,NAME,SEM1,SUB1,SUB2,SUB3,SUB4,SUB5) VALUES (?,?,?,?,?,?,?,?)",
      [usn, name, sem1, sub1, sub2, sub3, sub4, sub5],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          sendResponseIfFinished();
        }
      }
    );

    con.query(
      `INSERT INTO project (USN,NO_OF_PROJECT,PROJECT1,PROJECT2,PROJECT3,PROJECT4,PROJECT5) VALUES (?,?,?,?,?,?,?)`,
      [usn, numberOfProjects, project1, project2, project3, project4, project5],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          sendResponseIfFinished();
        }
      }
    );
    con.query(
      `INSERT INTO otheractivities (USN,ACTIVITY,ACTIVITY_NAME,INTERNSHIP,INTERNSHIP_DOMAIN) VALUES (?,?,?,?,?)`,
      [usn, activity, activityName, internship, internshipName],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          sendResponseIfFinished();
        }
      }
    );
  }
});

//Storing predicted value
app.post("/store-prediction", (req, res) => {
  const prediction = req.body.prediction;
  const usn = req.body.usn;
  function sendResponseIfFinished() {
    responsesReceived++;
    if (responsesReceived === 5) {
      // Assuming you have four queries
      res.send("values inserted");
    }
  }
  console.log("back pred", prediction);
  con.query(
    `INSERT INTO predict(USN,PREDICT) VALUES(?,?) ON DUPLICATE KEY UPDATE PREDICT = ?`,
    [usn, prediction, prediction],
    (error, result) => {
      if (error) throw error;
      else {
        sendResponseIfFinished();
      }
    }
  );
});
