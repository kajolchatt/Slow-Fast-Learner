import React, { useState } from 'react';
import Card from './Card';
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'; // Import Axios

function AdminPage() {
    const [cards, setCards] = useState([]);
    const [batch,setbatch]=useState(0);
    const navigate = useNavigate();

    const handleAddCard = () => {
        const newCard = {
            id: cards.length + 1,
            batchNumber: 2023 + cards.length + 1
        };
        setCards([...cards, newCard]);
    }

    const handleCardClick = (batchNumber) => {
        console.log("Clicked batch number:", batchNumber); // Add this line to check the batch number
        Axios.post("http://localhost:8000/student", { batchNumber: batchNumber })
            .then(() => {
                console.log("Batch number sent to backend:", batchNumber);
            })
            .catch(error => {
                console.error("Error sending batch number:", error);
            });
    
        navigate("/otherpage", { state: { batchNumber: batchNumber } });
    };

    return (
        <>
            <Navbar />
            <ImageBg />
            {cards.map((card, index) => (
                <div key={index} onClick={() => handleCardClick(card.batchNumber)}>
                    <Card batchNumber={card.batchNumber} />
                </div>
            ))}
            <button id="add" onClick={handleAddCard}>+</button>
        </>
    );
}

export default AdminPage;
