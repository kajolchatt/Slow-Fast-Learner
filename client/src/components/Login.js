import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/", {
            username,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/home", { state: { id: username } });
          } else if (res.data == "notexist") {
            alert("User have not signed up!");
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
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        ></input>
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup page</Link>
    </div>
  );
}
export default Login;