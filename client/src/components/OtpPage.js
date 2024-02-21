import React,{useState} from "react";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import "./OtpPage.css";
function OtpPage() {
    const [otp, setOtp] = useState();
    // const [otpSent, setOtpSent] = useState(false);
    const history = useNavigate();
    const location = useLocation();
    // const { useremail } = location.state;
    async function generateAndSendOtp(username) {
      try { 
        await axios.post("http://localhost:8000/otpPage", {
          useremail: username,
        });
      } catch (error) {
        console.error("Error generating OTP", error.message);
        alert("Error generating OTP. Please try again.");
      }
    }
  
      async function submit(e) {
        e.preventDefault();
        const useremail = localStorage.getItem("useremail");
        try {
    
          await axios
            .post("http://localhost:8000/otpPage1", {
              useremail:  useremail,
              OTP: parseInt(otp),
            })
            .then((res) => {
               if (res.data.token) {
                console.log("inside other page after verifying otp");
                localStorage.setItem("token", res.data.token);
                history("/updatePassword");
              }
            })
            .catch((e) => {
              alert("wrong details");
              console.log(e);
            });
        } catch (e) {
          console.log("wr", e.message);
        }
      }
    return (
      <>
      <Navbar />
            <ImageBg />
        <div className="otp-page-container">
            
            <label htmlFor="otp"  className="otp-label" style={{fontSize:"30px"}}>Enter OTP</label>
            <input
                type="text"
                id="otp"
                className="otp-input"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                placeholder="Enter OTP"
              />
              {/* <button onClick={generateAndSendOtp}>Generate OTP</button> */}
              <input type="submit" className="otp-submit-button" onClick={submit} />
        </div>
      </>
        
    );
}

export default OtpPage;
