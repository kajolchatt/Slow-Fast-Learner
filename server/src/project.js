const con=require('./config');
const express = require("express");
const cors = require("cors");
const app=express();
con.query('use slowfast',(err)=>{
    if(err){
        console.log("Error using database:",err.message);
        con.end();
        return;
    }
  console.log("using slowfast database");

  //create table project
  con.query(`CREATE TABLE IF NOT EXISTS project(
    
    USN VARCHAR(255),
    NO_OF_PROJECT INTEGER DEFAULT 0,
    PROJECT1 VARCHAR(255) DEFAULT 0,
    PROJECT2 VARCHAR(255) DEFAULT 0,
    PROJECT3 VARCHAR(255) DEFAULT 0,
    PROJECT4 VARCHAR(255) DEFAULT 0,
    PROJECT5 VARCHAR(255) DEFAULT 0
  )`)
})








