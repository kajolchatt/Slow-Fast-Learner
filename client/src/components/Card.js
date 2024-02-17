import React from "react";
import './Card.css';

function Card({ batchNumber }) {
    return (
        <div id="card">
            <h1><span>Batch</span></h1>
            <h2>{batchNumber}</h2>
        </div>
    );
}

export default Card;
