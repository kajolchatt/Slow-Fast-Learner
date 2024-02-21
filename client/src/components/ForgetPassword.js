import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import validator from "validator";

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
        await generateAndSendOtp(useremail);
        history("/otpPage");
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

  return (
    <div>
      <Navbar />
      <ImageBg />
      <label htmlFor="useremail">Email</label>
      <input
        type="text"
        placeholder="Enter your email"
        id="useremail"
        value={useremail}
        onChange={(event) => {
          setUserEmail(event.target.value);
        }}
      />
      <button type="submit" onClick={submit}>
        Submit
      </button>
    </div>
  );
}

export default ForgetPassword;
