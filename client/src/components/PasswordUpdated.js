import React from "react";
import Navbar from "./Navbar";
import ImageBg from "./ImageBg";
import "./Thankyou.css";
function PasswordUpdated() {
    return (
        <>
        <Navbar/>
        <ImageBg/>
          <center className="thankyou">
            <h1>Thank You!</h1>
            <p>Your password has been updated successfully.</p>
          </center>
        </>
    );
}

export default PasswordUpdated;
