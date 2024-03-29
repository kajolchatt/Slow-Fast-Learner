import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";
import AdminPage from "./AdminPage";
import OtherPage from "./OtherPage";
import Filter from "./Filter";
import ThankYou from "./Thankyou";
import ForgetPassword from "./ForgetPassword";
import OtpPage from "./OtpPage";
import About from "./About";
import UpdatePassword from "./UpdatePassword";
import PasswordUpdated from "./PasswordUpdated";
function RouteApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/otherpage" element={<OtherPage />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
        <Route path="/otpPage" element={<OtpPage/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/updatePassword" element={<UpdatePassword/>}></Route>
        <Route path="/passwordUpdated" element={<PasswordUpdated/>}></Route>
      </Routes>
    </>
  );
}
export default RouteApp;
