import React from "react";
import ReactDom from "react-dom";
import Navbar from "./Navbar";
import Typed from "typed.js";
import RouteApp from "./RouteApp";
import "./Start.css";
import ImageBg from "./ImageBg";
import { Link, useNavigate } from "react-router-dom";
function Start() {
  const el = React.useRef(null);
  const navigate = useNavigate();

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
    navigate("/signup");
  };
  return (
    <>
      <Navbar />
      <ImageBg />
      <div className="ani-body">
        <span ref={el} className="text"></span>
      </div>
      <button className="btn-next" onClick={handleNextClick}>
        Next
      </button>

      {/* <RouteApp/> */}
    </>
  );
}
export default Start;
