import React,{useEffect,useState} from "react";
import "../App.css";
import {useLocation,Link} from "react-router-dom";
import "./Home.css";
function Home(){
    const [name,setName]=useState("");
    const [usn,setusn]=useState("");
    const [pname,setpname]=useState("");
    const [cgpa1,setCgpa1]=useState("");
    const [cgpa2,setCgpa2]=useState("");
    const [cgpa3,setCgpa3]=useState("");
    const [cgpa4,setCgpa4]=useState("");
    const [cgpa5,setCgpa5]=useState("");
    const [cgpa6,setCgpa6]=useState("");
    const [cgpa7,setCgpa7]=useState("");
    const [cgpa8,setCgpa8]=useState("");
    const location=useLocation()

    return (
        <div className="homepage" >
        <h1>Hello {location.state.id} and welcome to the home</h1>
        <h2>fill up your details</h2>
        <div className="information">
        <label htmlFor="name"><strong>Enter Name</strong></label>
        <input type="text" id="name" placeholder="Enter Name"/><br></br>
        <label htmlFor="usn"><strong>Enter USN</strong></label>
        <input type="text" id="usn" placeholder="Enter USN"/><br />
        <label htmlFor="pname"><strong>Enter Project Name</strong></label>
        <input type="text" id="pname" placeholder="Enter Project Name"/><br></br>
        <label htmlFor="cgpa1"><strong>Enter Sem1 cgpa</strong></label>
        <input type="text" id="cgpa1" placeholder="Enter Sem1 cgpa"/><br></br>
        <label htmlFor="cgpa2"><strong>Enter Sem2 cgpa</strong></label>
        <input type="text" id="cgpa2" placeholder="Enter Sem2 cgpa"/><br></br>
        <label htmlFor="cgpa2"><strong>Enter Sem3 cgpa</strong></label>
        <input type="text" id="cgpa3" placeholder="Enter Sem3 cgpa"/><br></br>
        <label htmlFor="cgpa4"><strong>Enter Sem4 cgpa</strong></label>
        <input type="text" id="cgpa4" placeholder="Enter Sem4 cgpa"/><br></br>
        <label htmlFor="cgpa5"><strong>Enter Sem5 cgpa</strong></label>
        <input type="text" id="cgpa5" placeholder="Enter Sem5 cgpa"/><br></br>
        <label htmlFor="cgpa6"><strong>Enter Sem6 cgpa</strong></label>
        <input type="text" id="cgpa6" placeholder="Enter Sem6 cgpa"/><br></br>
        <label htmlFor="cgpa7"><strong>Enter Sem7 cgpa</strong></label>
        <input type="text" id="cgpa7" placeholder="Enter Sem7 cgpa"/><br></br>
        <label htmlFor="cgpa8"><strong>Enter Sem8 cgpa</strong></label>
        <input type="text" id="cgpa8" placeholder="Enter Sem8 cgpa"/><br></br>
        <button>Submit</button>
        </div>
        
        </div>
    )
}
export default Home