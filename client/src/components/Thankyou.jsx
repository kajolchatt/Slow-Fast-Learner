// ThankYou.js
import React from "react";
import Navbar from "./Navbar";
import ImageBg from "./ImageBg";
import "./Thankyou.css";
function ThankYou() {
  return (
    <>
      <div
        className="orange-bg"
        style={{ backgroundColor: "orangered", height: "15px" }}
      ></div>
      <Navbar />
      <ImageBg />
      <center className="thankyou">
        <h1>Thank You!</h1>
        <p>Your form has been submitted successfully.</p>
      </center>
    </>
  );
}

export default ThankYou;
