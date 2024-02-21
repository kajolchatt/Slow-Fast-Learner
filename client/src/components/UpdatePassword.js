import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import "./UpdatePassword.css";

function UpdatePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const useremail = localStorage.getItem("useremail"); // Retrieve useremail from localStorage
    const history = useNavigate();

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        if (event.target.value !== confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (newPassword !== event.target.value) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword === confirmPassword) {
            try {
                axios
                  .post("http://localhost:8000/passwordUpdate", {
                    useremail:  useremail,
                    newPassword: newPassword, // Pass newPassword to the backend for updating password
                  })
                  .then((res) => {
                    console.log("successful");
                  })
                  .catch((e) => {
                    alert("wrong details");
                    console.log(e);
                  });
              } catch (e) {
                console.log("wr", e.message);
              }
            console.log("Passwords match. Update password logic here.");
            history("/passwordUpdated");
        } else {
            alert("password don't match");
            console.log("Passwords don't match.");
        }
    };

    return (
        <>
            <Navbar />
            <ImageBg />
                <div className="update-password-container">
                    <h1>Update password</h1>
                    <label htmlFor="newpassword">New Password</label>
                    <input
                        type="password"
                        id="newpassword"
                        placeholder="Enter new Password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                    />
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        placeholder="Enter confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {!passwordsMatch && <p>Passwords do not match.</p>}
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
        </>
       
    );
}

export default UpdatePassword;
