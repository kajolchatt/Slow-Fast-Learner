import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";

function RouteApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </>
  );
}
export default RouteApp;
