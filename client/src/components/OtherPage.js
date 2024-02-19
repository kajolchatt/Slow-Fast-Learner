import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Axios from 'axios';
import "./OtherPage.css";
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";

function OtherPage() {
    const [studentList, setStudentList] = useState([]);
    const [studentPrediction1, setStudentPrediction1] = useState([]);
    const [studentPrediction0, setStudentPrediction0] = useState([]);
    const [showStudents, setShowStudents] = useState(false);
    const [showFastLearners, setShowFastLearners] = useState(false);
    const [showSlowLearners, setShowSlowLearners] = useState(false);
    const location = useLocation();
    const batchNumber = location.state?.batchNumber;

    const getStudent = () => {
        Axios.get(`http://localhost:8000/student?batchNumber=${batchNumber}`)
            .then(response => {
                setStudentList(response.data);
                setShowStudents(true);
                setShowFastLearners(false); // Hide fast learners
                setShowSlowLearners(false); // Hide slow learners
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });   
    };

    const getPrediction1 = () => {
        Axios.get(`http://localhost:8000/prediction`)
            .then(response => {
                const allStudents = response.data;
                // Filter fast learner predictions based on studentList
                const fastLearners = allStudents.filter(student => {
                    return student.PREDICT === 1 && studentList.some(s => s.USN === student.USN);
                });
                setStudentPrediction1(fastLearners);
                setShowFastLearners(true);
                setShowSlowLearners(false); // Hide slow learners
                setShowStudents(false); // Hide students
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    };
    
    const getPrediction0 = () => {
        Axios.get(`http://localhost:8000/prediction`)
            .then(response => {
                const allStudents = response.data;
                // Filter slow learner predictions based on studentList
                const slowLearners = allStudents.filter(student => {
                    return student.PREDICT === 0 && studentList.some(s => s.USN === student.USN);
                });
                setStudentPrediction0(slowLearners);
                setShowFastLearners(false);// Hide fast learners
                setShowSlowLearners(true); 
                setShowStudents(false); // Hide students
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    };
    

    return (
        <div>
            <Navbar />
            <ImageBg />
            <h1 >Batch Number: {batchNumber}</h1>
            <hr />

            <button className="filter" onClick={getStudent}>Show Students</button>
            <button className="filter" onClick={getPrediction1}>Show Fast Learners</button>
            <button className="filter" onClick={getPrediction0}>Show Slow Learners</button>
            




            {showStudents && (
                <div>
                    <h1>Students</h1>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>USN</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE NUMBER</th>
                                <th>BATCH</th>
                                <th>SECTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.USN}</td>
                                    <td>{student.NAME}</td>
                                    <td>{student.EMAIL}</td>
                                    <td>{student.PHONE_NUMBER}</td>
                                    <td>{student.BATCH}</td>
                                    <td>{student.SECTION}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showFastLearners && (
                <div>
                <h1>Fast Learners</h1>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>USN</th>
                            <th>PREDICT</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>SECTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentPrediction1.map((prediction1, index) => (
                            <tr key={index} className='student'>
                                <td>{prediction1.USN}</td>
                                <td>{prediction1.PREDICT}</td>
                                <td>{prediction1.NAME}</td>
                                <td>{prediction1.EMAIL}</td>
                                <td>{prediction1.PHONE_NUMBER}</td>
                                <td>{prediction1.SECTION}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            )}

            {showSlowLearners && (
                <div>
                <h1>Slow Learners</h1>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>USN</th>
                            <th>PREDICT</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE NUMBER</th>
                            <th>SECTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentPrediction0.map((prediction0, index) => (
                            <tr key={index} className='student'>
                                <td>{prediction0.USN}</td>
                                <td>{prediction0.PREDICT}</td>
                                <td>{prediction0.NAME}</td>
                                <td>{prediction0.EMAIL}</td>
                                <td>{prediction0.PHONE_NUMBER}</td>
                                <td>{prediction0.SECTION}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            )}
        </div>
    );
}

export default OtherPage;
