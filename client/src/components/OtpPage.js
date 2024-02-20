import React,{useState} from "react";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";

function OtpPage() {
    const [otp, setOtp] = useState();
    const [otpSent, setOtpSent] = useState(false);
    return (
        <div >
            <Navbar />
            <ImageBg />
            <label htmlFor="otp">Enter OTP</label>
            <input
                type="text"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                placeholder="Enter OTP"
              />
        </div>
    );
}

export default OtpPage;
