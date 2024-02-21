import React, { useState } from "react";
import ReactDom from "react-dom";
import Navbar from "./Navbar";
import Typed from "typed.js";
import RouteApp from "./RouteApp";
import "./Start.css";
import ImageBg from "./ImageBg";
import { Link, useNavigate } from "react-router-dom";
import ModalWindowLoader from "./ModalWindowLoader";
function Start() {
  const el = React.useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Hello There",
        "Welcome to RNSIT",
        "Slow-Fast Portal",
        "Click down to move on to next page",
      ],
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 40,
      loop: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  const handleNextClick = () => {
    // Use history to navigate to the desired route
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/signup");
    }, 200);
  };
  return (
    <>
      <div className="orange-bg"></div>

      <Navbar />
      <ImageBg />
      <div className="ani-body">
        <span ref={el} className="text"></span>
      </div>
      <button className="btn-next" onClick={handleNextClick}>
        Next
      </button>
      {loading && <ModalWindowLoader loading={loading} />}
      {/* <RouteApp/> */}
      {/* <Footer/> */}
    </>
  );
}
export default Start;
