import bgimage from "../assets/bg.png";
import "./ImageBg.css";
import { useEffect } from "react";
function ImageBg() {
  return (
    <div className="image-container">
      <img src={bgimage} alt="Background" className="img-bg" />

      <h2 className="text-bg">Fast-Slow Learner Application</h2>
    </div>
  );
}
export default ImageBg;
