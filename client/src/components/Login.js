import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import ModalWindowLoader from "./ModalWindowLoader";

function Login() {
  const history = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/login", {
          username,
          password,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            const token = localStorage.getItem("token");

            // Decode the JWT token to access its payload
            const decodedToken = jwtDecode(token);

            // Access the 'type' property from the decoded token
            const userType = decodedToken.type;
            // const userType = res.data.token.type;
            if (userType === "Admin") {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                history("/adminPage");
              }, 300);
              // history("/adminPage");
            } else if (userType === "Student") {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                history("/home");
              }, 300);
              // history("/home", { username });
            } else {
              // history("/home");
            }
          } else if (res.data === "notexist") {
            alert("User have not signed up!");
          } else {
            console.log(res.data.token);
            alert("Authentication failed");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
    console.log({ username });
    await axios
      .post("http://localhost:8000/fetch-existing-data", { username })
      .then((res) => {
        console.log("log", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div
        className="orange-bg"
        style={{ backgroundColor: "orangered", height: "15px" }}
      ></div>
      <Navbar />
      <ImageBg />
      <div className="login lo">
        <box-icon name="user" color=" rgb(22, 22, 137)" size="lg"></box-icon>
        <h1>Login</h1>

        <form action="POST" className="form">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email Id"
            required
          ></input>{" "}
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            required
          ></input>
          <br />
          <input type="submit" onClick={submit} />
          {loading && <ModalWindowLoader loading={loading} />}
        </form>

        <p>OR</p>
        <Link to="/signup" className="links">
          Signup page
        </Link>
        <div
          style={{
            width: "40%",
            height: "2px",
            marginLeft: "30%",
            backgroundColor: "rgb(176, 176, 176)",
            marginBottom: "25px",
            marginTop: "13px",
          }}
        ></div>
        <Link to="/forgetPassword" className="links">
          Forgot password ?
        </Link>
      </div>
    </>
  );
}
export default Login;
