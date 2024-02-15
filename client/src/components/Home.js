import React, { useEffect, useState } from "react";
import "../App.css";
import { useLocation, Link } from "react-router-dom";
import "./Home.css";
import Axios from "axios";
function Home() {
  const [name, setName] = useState("");
  const [usn, setusn] = useState("");
  const [pno, setpno] = useState("");
  const [email, setemail] = useState("");
  const [batch, setBatch] = useState("");
  const [sem, setSem] = useState("");
  const [otherskills, setOtherskills] = useState("");
  const [cgpa1, setCgpa1] = useState("0");
  const [sub1, setSub1] = useState("0");
  const [sub2, setSub2] = useState("0");
  const [sub3, setSub3] = useState("0");
  const [sub4, setSub4] = useState("0");
  const [sub5, setSub5] = useState("0");

  const location = useLocation();
  const [numberOfProjects, setNumberOfProjects] = useState(0);
  const [project1, setProject1] = useState("");
  const [project2, setProject2] = useState("");
  const [project3, setProject3] = useState("");
  const [project4, setProject4] = useState("");
  const [project5, setProject5] = useState("");

  const displayInfo = () => {
    Axios.post("http://localhost:8000/home", {
      usn: usn,
      name: name,
      email: email,
      pno: pno,
      batch: batch,
      sem: sem,
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
    }).then(() => {
      console.log("Success");
    });
  };

  return (
    <>
      <div className="homepage">
        <h1>Hello {location.state.id} and welcome to the home</h1>
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
          />
          <br />
          <label htmlFor="phn">
            <strong>Enter Phone Number</strong>
          </label>
          <input
            type="number"
            id="phn"
            placeholder="Enter Phone Number"
            onChange={(event) => {
              setpno(event.target.value);
            }}
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
          />
          <br />
          <label htmlFor="sem">
            <strong>Enter Current Semester</strong>
          </label>
          <input
            type="sem"
            id="sem"
            placeholder="Enter Current Semester"
            onChange={(event) => {
              setSem(event.target.value);
            }}
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
          <label htmlFor="otherskill">
            <strong>Enter Other Skills</strong>
          </label>
          <input
            type="text"
            id="otherskills"
            placeholder="Enter other skills"
            onChange={(event) => {
              setOtherskills(event.target.value);
            }}
          />
          <br></br>
          <button onClick={displayInfo}>Submit</button>
        </div>
      </div>
    </>
  );
}
export default Home;
