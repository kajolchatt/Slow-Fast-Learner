import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
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
            history("/home");
          } else if (res.data == "notexist") {
            alert("User have not signed up!");
          }
          else{
            alert("Authentication failed")
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <Navbar />
      <ImageBg />
      <div className="login">
        <h1>Login</h1>

        <form action="POST" className="form">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email"
          required></input>{" "}
          <br />
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            required></input>
          <br />
          <br />
          <input type="submit" onClick={submit} />
        </form>

        <br />
        <p>OR</p>
        <br />
        <Link to="/signup">Signup page</Link>
      </div>
    </>
  );
}
export default Login;
