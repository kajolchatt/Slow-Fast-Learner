import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import "./Signup.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import validator from "validator";
import "boxicons";

function Signup() {
  const history = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [userid, setUserid] = useState("");
  const [otp, setOtp] = useState();
  const [otpSent, setOtpSent] = useState(false);

  async function generateAndSendOtp(e) {
    e.preventDefault();
    try {
      if (!validator.isEmail(username)) {
        alert("Please enter a valid email address");
        return;
      }
      await axios
        .post("http://localhost:8000/generate-otp", {
          type,
        })
        .then((response) => {
          if (response.data === "success") {
            alert("otp has been sent to higher authority");
            setOtpSent(true);
          } else {
            console.log("res", response.data);
            alert("failed to generate otp");
          }
        })
        .catch((error) => {
          console.error("Error generating otp", error.message);
          alert("error generating otp1. please try again");
        });
    } catch (e) {
      console.log(e);
    }
  }
  async function submit(e) {
    e.preventDefault();

    try {
      if (type === "Admin" && !otpSent) {
        await generateAndSendOtp();
        return;
      }

      if (!validator.isEmail(username)) {
        alert("Please enter a valid email address");
        return;
      }

      await axios
        .post("http://localhost:8000/signup", {
          username,
          password,
          userid,
          type,
          OTP: parseInt(otp),
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            history("/login");
            // history("/login");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log("wr", e.message);
    }
  }
  return (
    <>
      <Navbar />
      <ImageBg />
      <div className="login">
       
        <box-icon name="user" color=" rgb(22, 22, 137)" size="lg"></box-icon>
        <h1>Signup</h1>
        <form action="POST" className="form">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
          ></input>
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          ></input>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
            placeholder="userId->FacultyId or Usn"
          ></input>
          <br />

          <select
            className="type-field"
            onChange={(e) => {
              setType(e.target.value);
              setOtpSent(false);
            }}
          >
            <option value="" disabled selected>
              Select type
            </option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
          <br />

          {type === "Admin" && !otpSent && (
            <>
              <button onClick={generateAndSendOtp}>Generate OTP</button>
            </>
          )}
          {type === "Admin" && otpSent && (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                placeholder="Enter OTP"
              />
            </>
          )}

          <input type="submit" onClick={submit} />
        </form>
        <p>OR</p>
        <Link to="/login">Login page</Link>
      </div>
    </>
  );
}
export default Signup;
