import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";

function Login() {
  const history = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/login", {
          username,
          password,
        })
        .then((res) => {
          // if (res.data == "exist") {
          //   history("/home", { state: { id: username } });
          // }
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            const token = localStorage.getItem("token");

            // Decode the JWT token to access its payload
            const decodedToken = jwtDecode(token);

            // Access the 'type' property from the decoded token
            const userType = decodedToken.type;
            // const userType = res.data.token.type;
            if (userType === "Admin") {
              history("/adminPage");
            } else if (userType === "Student") {
              history("/home");
            } else {
              history("/home");
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
      <Navbar />
      <ImageBg />
      <div className="login">
        <box-icon name="user" color=" rgb(22, 22, 137)" size="lg"></box-icon>
        <h1>Login</h1>

        <form action="POST" className="form">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
            required
          ></input>{" "}
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            required
          ></input>
          <br />
          <input type="submit" onClick={submit} />
        </form>

        <p>OR</p>
        <Link to="/signup">Signup page</Link>
      </div>
    </>
  );
}
export default Login;
