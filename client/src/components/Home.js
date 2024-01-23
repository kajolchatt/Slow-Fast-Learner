import React,{useEffect,useState} from "react"
// import axios from 'axios'
import {useLocation,Link} from "react-router-dom"

function Home(){

    const location=useLocation()

    return (
        <div className="homepage">
        <h1>Hello {location.state.id} and welcome to the home</h1>
        </div>
    )
}
export default Home