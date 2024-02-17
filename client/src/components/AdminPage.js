import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from React Router
import Card from './Card';
import ImageBg from "./ImageBg";
import Navbar from "./Navbar";

function AdminPage() {
    const [card, setCard] = useState([]);
    const handleAddCard=()=>{
        setCard([...card, <Card key={card.length} />]);
    }
    return (
        <>
            <Navbar />
            <ImageBg />
            <Card/>
            <button id="add" onClick={handleAddCard}>+</button>
            <div>
                {card.map((card, index) => (
                <div key={index}>
                    {card}
                </div>
                ))}
            </div>
        </>
    );
}

export default AdminPage;
