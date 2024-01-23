import React, { useState } from "react"
import { Link } from "react-router-dom"
import validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    const navigate=useNavigate();
    const [errors,setErrors]=useState({})
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if( errors.email ===  "" && errors.password === ""){
            axios.post('http://localhost:8081/login',values)
            .then(res=>{
                if(res.data==="Success"){
                    navigate('/home');
                }
                else{
                    alert("No record existed");
                }
            })
            .catch(err=>console.log(err));
        }
    }

    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100"> 
            <div className="bg-white p-3 rounded w-25">
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name='email' onChange={handleInput} className="form-control rounded-0"/>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name='password' onChange={handleInput} className="form-control rounded-0"/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button className="btn btn-success w-100 rounded-0"><strong>Login</strong></button>
                    <p>You agree to our term and policies</p>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
                </form>
            </div>
        </div>
    )
}