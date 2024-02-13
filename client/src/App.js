import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import RouteApp from "./components/RouteApp.js";
import Start from "./components/Start.js";
function App() {
  return (
    <Router>
    <div className="App">
      <RouteApp/>
      {/* <Navbar /> */}
    </div>
    </Router>
  );
}

export default App;
