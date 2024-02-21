import react from "react";
import Navbar from "./Navbar";
import ImageBg from "./ImageBg";
function About() {
  return (
    <>
      <div
        className="orange-bg"
        style={{ backgroundColor: "orangered", height: "15px" }}
      ></div>
      <Navbar />
      <ImageBg />
      <div>
        <p style={{ textAlign: "center", padding:"30px 300px",fontSize:"30px" ,color:"gray"}}>
          Our project is designed to offer a comprehensive platform where
          students can input their academic details and participation in various
          extracurricular activities. This innovative feature enables us to
          categorize students as either fast learners or slow learners, based on
          their academic performance and involvement in non-academic pursuits.
          The system ensures a well-rounded evaluation, providing faculty
          members with valuable insights into each student's learning pace and
          abilities. On the administrative side, an easy-to-use interface allows
          faculty members to effortlessly access and review this classification.
          Meanwhile, the student interface features an intuitive form,
          simplifying the submission of academic and extracurricular
          information. This dual functionality not only promotes transparency in
          the assessment process but also encourages students to actively
          participate in shaping their educational experience.
        </p>
      </div>
    </>
  );
}
export default About;
