import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import validator from "validator";
import "./ForgetPassword.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; 



function ForgetPassword() {
  const history = useNavigate();
  const [useremail, setUserEmail] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/forgetPassword", {
        useremail,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("useremail", useremail);
        await generateAndSendOtp(useremail);
        history("/otpPage",{useremail});
      } else if (response.data === "notexist") {
        alert("User has not signed up!");
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      alert("Wrong details");
      console.log(error);
    }
  }

  async function generateAndSendOtp(username) {
    try {
      if (!validator.isEmail(username)) {
        alert("Please enter a valid email address");
        return;
      }
      await axios.post("http://localhost:8000/otpPage", {
        useremail: username,
      });
    } catch (error) {
      console.error("Error generating OTP", error.message);
      alert("Error generating OTP. Please try again.");
    }
  }

  return (<>
  <Navbar />
      <ImageBg />
  <div className="forget-password-container">
      
  <label htmlFor="useremail" style={{fontSize:"30px"}}>Email &nbsp;
        <FontAwesomeIcon icon={faEnvelope} style={{color:"#0056b3"}}/> {/* Email icon */}
        
      </label>
      <input
        type="text"
        placeholder="Enter your email"
        id="useremail"
        className="forget-password-input"
        value={useremail}
        onChange={(event) => {
          setUserEmail(event.target.value);
        }}
      />
      <button type="submit" className="forget-password-button" onClick={submit}>
        Submit
      </button>
    </div></>
    
  );
}

export default ForgetPassword;
