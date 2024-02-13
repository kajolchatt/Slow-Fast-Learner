import bgimage from "../assets/bg.png";
import "./ImageBg.css";
function ImageBg() {
  return (
    <div className="image-container">
      <img src={bgimage} alt="Background" className="img-bg" />
      <h2 className="text-bg"></h2>
    </div>
  );
}
export default ImageBg;
