require("./app1");
const { express, con, cors, app } = require("./app1");
app.use(cors());
app.use(express.json());
app.post("/home", (req, res) => {
  console.log(req.body);
  const usn = req.body.usn;
  const name = req.body.name;
  const email = req.body.email;
  const pno = req.body.pno;
  const batch = req.body.batch;
  const sem = req.body.sem;
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

  con.query(
    "INSERT INTO student (USN,NAME,EMAIL,PHONE_NUMBER,BATCH,CURRENT_SEMESTER) VALUES (?,?,?,?,?,?)",
    [usn, name, email, pno, batch, sem],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
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
        res.send("values inserted");
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
        res.send("values inserted");
      }
    }
  );
});
