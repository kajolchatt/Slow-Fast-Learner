import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";
import AdminPage from "./AdminPage";
import OtherPage from "./OtherPage";
import Filter from "./Filter";

function RouteApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminPage" element={<AdminPage/>}/>
        <Route path="/otherpage" element={<OtherPage/>}/>
        <Route path="/filter" element={<Filter/>}/>
      </Routes>
    </>
  );
}
export default RouteApp;
