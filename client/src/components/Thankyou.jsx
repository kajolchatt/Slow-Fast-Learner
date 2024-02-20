// ThankYou.js
import React from "react";
import Navbar from "./Navbar";
import ImageBg from "./ImageBg";

function ThankYou() {
  return (
    <>
    <Navbar/>
    <ImageBg/>
      <center>
        <h1>Thank You!</h1>
        <p>Your form has been submitted successfully.</p>
      </center>
    </>
  );
}

export default ThankYou;
