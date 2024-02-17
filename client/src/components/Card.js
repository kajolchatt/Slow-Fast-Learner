import React from "react";
import './Card.css';

function Card({ batch }) {
    return (
        <div id="card">
            <h1><span>Batch</span></h1>
            <h2>{batch}</h2>
        </div>
    );
}

export default Card;
