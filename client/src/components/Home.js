import React,{useEffect,useState} from "react";
import "../App.css";
import {useLocation,Link} from "react-router-dom";
import "./Home.css";
import Axios from 'axios';
function Home(){
    const [name,setName]=useState("");
    const [usn,setusn]=useState("");
    const [pno,setpno]=useState("");
    const [email,setemail]=useState("");
    const [otherskills,setOtherskills]=useState("");
    const [cgpa1,setCgpa1]=useState("");
    const [cgpa2,setCgpa2]=useState("");
    const [cgpa3,setCgpa3]=useState("");
    const [cgpa4,setCgpa4]=useState("");
    const [cgpa5,setCgpa5]=useState("");
    const [cgpa6,setCgpa6]=useState("");
    const [cgpa7,setCgpa7]=useState("");
    const [cgpa8,setCgpa8]=useState("");
    const location=useLocation()
    const [numberOfProjects, setNumberOfProjects] = useState(0);
    const [projectNames, setProjectNames] = useState(Array(numberOfProjects).fill(''));
  
    const handleInputChange = (e) => {
      const value = parseInt(e.target.value, 10);
      setNumberOfProjects(isNaN(value) ? 0 : value);
      setProjectNames(Array(value).fill(''));
    };
  
    const handleProjectNameChange = (index, projectName) => {
      const newProjectNames = [...projectNames];
      newProjectNames[index] = projectName;
      setProjectNames(newProjectNames);
    };
 

    const displayInfo=()=>{
        Axios.post('http://localhost:8000/home',{usn:usn,name:name,email:email,pno:pno}).then(()=>{
            console.log("Success");
        })
    }


    return (
        <div className="homepage" >
        <h1>Hello {location.state.id} and welcome to the home</h1>
        <h1>Fill up your details</h1><br />
        <h2>Personal Information</h2>
        <div className="information">
        <label htmlFor="name"><strong>Enter Name</strong></label>
        <input type="text" id="name" placeholder="Enter Name" onChange={(event)=>{setName(event.target.value);}}/><br></br>
        <label htmlFor="usn"><strong>Enter USN</strong></label>
        <input type="text" id="usn" placeholder="Enter USN" onChange={(event)=>{setusn(event.target.value);}}/><br />
        <label htmlFor="phn"><strong>Enter Phone Number</strong></label>
        <input type="number" id="phn" placeholder="Enter Phone Number" onChange={(event)=>{setpno(event.target.value);}}/><br />
        <label htmlFor="email"><strong>Enter Email Id</strong></label>
        <input type="email" id="email" placeholder="Enter Email Id" onChange={(event)=>{setemail(event.target.value);}}/><br />
        <hr/>
        <h2>Project Information</h2><br></br>



        <label htmlFor="projectNumber">Enter the number of projects:</label>
      <input
        type="number"
        id="projectNumber"
        placeholder="Enter number"
        value={numberOfProjects}
        onChange={handleInputChange} min="0"
      />

      <form>
        {projectNames.map((projectName, index) => (
          <div key={index}>
            <label htmlFor={`projectName${index}`}>Project {index + 1} Name:</label>
            <input
              type="text"
              id={`projectName${index}`}
              placeholder={`Enter project ${index + 1} name`}
              value={projectName}
              onChange={(e) => handleProjectNameChange(index, e.target.value)}
            />
          </div>
        ))}
      </form>
<br></br>

        <h2>Academic Details</h2>
        <label htmlFor="cgpa1"><strong>Enter Sem1 cgpa</strong></label>
        <input type="text" id="cgpa1" placeholder="Enter Sem1 cgpa" onChange={(event)=>{setCgpa1(event.target.value);}}/><br></br>
        <label htmlFor="cgpa2"><strong>Enter Sem2 cgpa</strong></label>
        <input type="text" id="cgpa2" placeholder="Enter Sem2 cgpa" onChange={(event)=>{setCgpa2(event.target.value);}}/><br></br>
        <label htmlFor="cgpa2"><strong>Enter Sem3 cgpa</strong></label>
        <input type="text" id="cgpa3" placeholder="Enter Sem3 cgpa" onChange={(event)=>{setCgpa3(event.target.value);}}/><br></br>
        <label htmlFor="cgpa4"><strong>Enter Sem4 cgpa</strong></label>
        <input type="text" id="cgpa4" placeholder="Enter Sem4 cgpa" onChange={(event)=>{setCgpa4(event.target.value);}}/><br></br>
        <label htmlFor="cgpa5"><strong>Enter Sem5 cgpa</strong></label>
        <input type="text" id="cgpa5" placeholder="Enter Sem5 cgpa" onChange={(event)=>{setCgpa5(event.target.value);}}/><br></br>
        <label htmlFor="cgpa6"><strong>Enter Sem6 cgpa</strong></label>
        <input type="text" id="cgpa6" placeholder="Enter Sem6 cgpa" onChange={(event)=>{setCgpa6(event.target.value);}}/><br></br>
        <label htmlFor="cgpa7"><strong>Enter Sem7 cgpa</strong></label>
        <input type="text" id="cgpa7" placeholder="Enter Sem7 cgpa" onChange={(event)=>{setCgpa7(event.target.value);}}/><br></br>
        <label htmlFor="cgpa8"><strong>Enter Sem8 cgpa</strong></label>
        <input type="text" id="cgpa8" placeholder="Enter Sem8 cgpa" onChange={(event)=>{setCgpa8(event.target.value);}}/><br></br>
        
        <h3>
            Other Skills
        </h3>
        <label htmlFor="otherskill"><strong>Enter Other Skills</strong></label>
        <input type="text" id="otherskills" placeholder="Enter other skills" onChange={(event)=>{setOtherskills(event.target.value);}}/><br></br>

        <button onClick={displayInfo}>Submit</button>
        </div>
        
        </div>
    )
}
export default Home