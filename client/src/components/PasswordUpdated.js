import React from "react";
import Navbar from "./Navbar";
import ImageBg from "./ImageBg";

function PasswordUpdated() {
    return (
        <>
        <Navbar/>
        <ImageBg/>
          <center>
            <h1>Thank You!</h1>
            <p>Your password has been updated successfully.</p>
          </center>
        </>
    );
}

export default PasswordUpdated;
