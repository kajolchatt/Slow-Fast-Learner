import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Axios from 'axios';

function OtherPage() {
    const [studentList, setStudentList] = useState([]);
    const location = useLocation();
    const batchNumber = location.state?.batchNumber;

    const getStudent = () => {
        Axios.get(`http://localhost:8000/student?batchNumber=${batchNumber}`)
            .then(response => {
                setStudentList(response.data);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    };

    return (
        <div>
            <h1>Batch Number: {batchNumber}</h1>
            <h2>Other Page</h2>
            <p>This is the other page content.</p>
            <button onClick={getStudent}>Show Students</button>
            <div>
                {studentList.map((student, index) => (
                    <div key={index} className='student'>
                        <p>USN: {student.USN}</p>
                        <p>Name: {student.NAME}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtherPage;
