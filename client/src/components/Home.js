import React, { useEffect, useState } from "react";
import "../App.css";
// import { useLocation, Link } from "react-router-dom";
import "./Home.css";
import "./Signup.css"
import Axios from "axios";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
function Home() {
  const history = useNavigate();
  const [fetchedData, setFetchedData] = useState({});
  const [name, setName] = useState("");
  const [usn, setusn] = useState("");
  const [pno, setpno] = useState("");
  const [email, setemail] = useState("");
  const [batch, setBatch] = useState("");
  const [sem, setSem] = useState("");
  const [activity, setActivity] = useState("0");
  const [activityName, setActivityName] = useState("");
  const [cgpa1, setCgpa1] = useState("0");
  const [sub1, setSub1] = useState("0");
  const [sub2, setSub2] = useState("0");
  const [sub3, setSub3] = useState("0");
  const [sub4, setSub4] = useState("0");
  const [sub5, setSub5] = useState("0");
  const [numberOfProjects, setNumberOfProjects] = useState(0);
  const [project1, setProject1] = useState("");
  const [project2, setProject2] = useState("");
  const [project3, setProject3] = useState("");
  const [project4, setProject4] = useState("");
  const [project5, setProject5] = useState("");
  const [internship, setInternship] = useState("0");
  const [internshipName, setInternshipName] = useState("");
  const [section, setSection] = useState("");
  const [backlog, setBacklog] = useState("0");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:8000/fetch-existing-data")
      .then((response) => {
        console.log(response.data[0].SECTION);
        setFetchedData(response.data[0]);
        setEdit(!!response.data[0]);
        // if (response.data) {
        setName(response.data[0].NAME || "");
        setusn(response.data[0].USN || "");
        setpno(response.data[0].PHONE_NUMBER || "");
        setemail(response.data[0].EMAIL || "");
        setBatch(response.data[0].BATCH || "");
        setSem(response.data[0].CURRENT_SEMESTER || "");
        // setActivityName(response.data[0].ACTIVITY_NAME || "");
        // setCgpa1(response.data[0].SEM1 || "0");
        // setSub1(response.data[0].SUB1 || "0");
        // setSub2(response.data[0].SUB2 || "0");
        // setSub3(response.data[0].SUB3 || "0");
        // setSub4(response.data[0].SUB4 || "0");
        // setSub5(response.data[0].SUB5 || "0");
        // setNumberOfProjects(response.data[0].NO_OF_PROJECT || 0);
        // setProject1(response.data[0].PROJECT1 || "");
        // setProject2(response.data[0].PROJECT2 || "");
        // setProject3(response.data[0].PROJECT3 || "");
        // setProject4(response.data[0].PROJECT4 || "");
        // setProject5(response.data[0].PROJECT5 || "");
        // setInternshipName(response.data[0].INTERNSHIP_DOMAIN || "");
        setSection(response.data[0].SECTION || "");
        // setBacklog(response.data[0].BACKLOG || "");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggle = () => {
    setEdit(!edit);
    console.log("***", numberOfProjects);
    console.log("**", sem);
  };
  const displayInfo = () => {
    updateData();
    toggle();
    history("/thank-you");
  };
  const updateData = () => {
    Axios.post("http://localhost:8000/home", {
      usn: usn,
      name: name,
      email: email,
      pno: pno,
      batch: batch,
      sem: sem,
      section: section,
      sem1: cgpa1,
      sub1: sub1,
      sub2: sub2,
      sub3: sub3,
      sub4: sub4,
      sub5: sub5,
      numberOfProjects: numberOfProjects,
      project1: project1,
      project2: project2,
      project3: project3,
      project4: project4,
      project5: project5,
      activity: activity,
      internship: internship,
      internshipName: internshipName,
      activityName: activityName,

      backlog: backlog,
    })
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.post("http://localhost:5000/api/predict", {
      CGPA: parseFloat(cgpa1),
      IAMARKS_SUB1: parseInt(sub1),
      IAMARKS_SUB2: parseInt(sub2),
      IAMARKS_SUB3: parseInt(sub3),
      IAMARKS_SUB4: parseInt(sub4),
      IAMARKS_SUB5: parseInt(sub5),
      NUMBER_PROJECT: numberOfProjects,
      INTERNSHIP: parseInt(internship),
      BACKLOGS: parseInt(backlog),
      EXTRA_ACTIVITIES: parseInt(activity), //activity,
    })
      .then((response) => {
        const prediction = response.data.prediction;
        console.log("Prediction:", prediction);

        // Now send the prediction to your Node.js backend to store in the database
        Axios.post("http://localhost:8000/store-prediction", {
          prediction: prediction,
          usn: usn,
        }).then(() => {
          console.log("Prediction stored in MySQL");
        });
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <>
      <Navbar />
      <ImageBg />
      <ProtectedRoute path="/home" component={Home} />
      <div className="homepage">
        <h1>Hello and welcome to the home</h1>
        <h1>Fill up your details</h1>
        <br />
        <h2>Personal Information</h2>
        <div className="information">
          <label htmlFor="name">
            <strong>Enter Name</strong>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={fetchedData.NAME}
          />
          <br></br>
          <label htmlFor="usn">
            <strong>Enter USN</strong>
          </label>
          <input
            type="text"
            id="usn"
            placeholder="Enter USN"
            onChange={(event) => {
              setusn(event.target.value);
            }}
            value={fetchedData.USN || usn}
          />
          <br />
          <label htmlFor="phn">
            <strong>Enter Phone Number</strong>
          </label>
          <input
            type="text"
            id="phn"
            placeholder="Enter Phone Number"
            onChange={(event) => {
              setpno(event.target.value);
            }}
            value={fetchedData.PHONE_NUMBER}
          />
          <br />
          <label htmlFor="email">
            <strong>Enter Email Id</strong>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Id"
            onChange={(event) => {
              setemail(event.target.value);
            }}
            value={fetchedData.EMAIL}
          />
          <br />
          <label htmlFor="batch">
            <strong>Enter Batch</strong>
          </label>
          <input
            type="text"
            id="batch"
            placeholder="Enter batch"
            onChange={(event) => {
              setBatch(event.target.value);
            }}
            value={fetchedData.BATCH}
          />
          <br />
          <label htmlFor="sem">
            <strong>Enter Current Semester</strong>
          </label>
          <input
            type="text"
            id="sem"
            placeholder="Enter Current Semester"
            onChange={(event) => {
              setSem(event.target.value);
            }}
          />
          <br />
          <label htmlFor="section">
            <strong>Enter Section</strong>
          </label>
          <input
            type="text"
            id="section"
            placeholder="Enter Section"
            onChange={(event) => {
              setSection(event.target.value);
            }}
            value={fetchedData.SECTION}
          />
          <br />
          <hr />
          <h2>Project Information</h2>
          <br></br>
          <label htmlFor="numberOfProjects">
            <strong>Enter number Of Projects</strong>
          </label>
          <input
            type="text"
            id="numberOfProjects"
            placeholder="Enter no of projects done"
            onChange={(event) => {
              setNumberOfProjects(event.target.value);
            }}
          />
          <br></br>
          <label htmlFor="project1">
            <strong>Enter 1'st Project Name</strong>
          </label>
          <input
            type="text"
            id="project1"
            placeholder="Enter 1'st Project Name"
            onChange={(event) => {
              setProject1(event.target.value);
            }}
          />
          <br></br>
          <label htmlFor="project2">
            <strong>Enter 2'nd Project Name</strong>
          </label>
          <input
            type="text"
            id="project2"
            placeholder="Enter 2'nd Project Name"
            onChange={(event) => {
              setProject2(event.target.value);
            }}
          />
          <br></br>
          <label htmlFor="project3">
            <strong>Enter 3'rd Project Name</strong>
          </label>
          <input
            type="text"
            id="project3"
            placeholder="Enter 3'rd Project Name"
            onChange={(event) => {
              setProject3(event.target.value);
            }}
          />
          <br></br>
          <label htmlFor="project4">
            <strong>Enter 4'th Project Name</strong>
          </label>
          <input
            type="text"
            id="project4"
            placeholder="Enter 4'th Project Name"
            onChange={(event) => {
              setProject4(event.target.value);
            }}
          />
          <br></br>
          <label htmlFor="project5">
            <strong>Enter 5'th Project Name</strong>
          </label>
          <input
            type="text"
            id="project5"
            placeholder="Enter 5'th Project Name"
            onChange={(event) => {
              setProject5(event.target.value);
            }}
          />
          <br></br>
          <br></br>
          <h2>Academic Details</h2>
          <label htmlFor="cgpa1">
            <strong>Enter cgpa</strong>
          </label>
          <input
            type="text"
            id="cgpa1"
            placeholder="Enter cgpa"
            onChange={(event) => {
              setCgpa1(event.target.value);
            }}
          />
          <label htmlFor="backlog">
            <strong>Any backlogs??</strong>
          </label>
          <input
            type="text"
            id="backlog"
            placeholder="Enter yes or no"
            onChange={(event) => {
              if (event.target.value.toUpperCase() === "NO") {
                setBacklog(0);
              } else {
                setBacklog(1);
              }
            }}
          />
          <br></br>
          <h2>Enter IA Marks</h2>
          <label htmlFor="sub1">
            <strong>Subject 1</strong>
          </label>
          <input
            type="text"
            id="sub1"
            placeholder="Enter Subject 1 marks"
            onChange={(event) => {
              setSub1(event.target.value);
            }}
          />{" "}
          <br />
          <br />
          <label htmlFor="sub2">
            <strong>Subject 2</strong>
          </label>
          <input
            type="text"
            id="sub2"
            placeholder="Enter Subject 2 marks"
            onChange={(event) => {
              setSub2(event.target.value);
            }}
          />{" "}
          <br />
          <br />
          <label htmlFor="sub3">
            <strong>Subject 3</strong>
          </label>
          <input
            type="text"
            id="sub3"
            placeholder="Enter Subject 3 marks"
            onChange={(event) => {
              setSub3(event.target.value);
            }}
          />{" "}
          <br />
          <br />
          <label htmlFor="sub4">
            <strong>Subject 4</strong>
          </label>
          <input
            type="text"
            id="sub4"
            placeholder="Enter Subject 4 marks"
            onChange={(event) => {
              setSub4(event.target.value);
            }}
          />{" "}
          <br />
          <br />
          <label htmlFor="sub5">
            <strong>Subject 5</strong>
          </label>
          <input
            type="text"
            id="sub5"
            placeholder="Enter Subject 5 marks"
            onChange={(event) => {
              setSub5(event.target.value);
            }}
          />{" "}
          <br />
          <br />
          <h3>Other Skills</h3>
          <label htmlFor="activity">
            <strong>Enter Other Skills</strong>
          </label>
          <input
            type="text"
            id="activity"
            placeholder="Enter other skills (if not write no)"
            onChange={(event) => {
              if (event.target.value.toUpperCase() === "NO") {
                setActivity(0);
                setActivityName("");
              } else {
                setActivity(1);
                setActivityName(event.target.value);
              }
            }}
          />
          <label htmlFor="internship">Are you doing any Internship??</label>
          <input
            type="text"
            id="internship"
            placeholder="Enter **no** if none else enter internship domain"
            onChange={(event) => {
              if (event.target.value.toUpperCase() === "NO") {
                setInternship(0);
                setInternshipName("");
              } else {
                setInternship(1);
                setInternshipName(event.target.value);
              }
            }}
          />
          <br></br>
          {edit ? (
            <button onClick={toggle}>Edit Done</button>
          ) : (
            <button onClick={displayInfo}>Submit</button>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
