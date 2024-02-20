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
    
    USN VARCHAR(255) PRIMARY KEY,
    NO_OF_PROJECT INTEGER DEFAULT 0,
    PROJECT1 VARCHAR(255) DEFAULT 0,
    PROJECT2 VARCHAR(255) DEFAULT 0,
    PROJECT3 VARCHAR(255) DEFAULT 0,
    PROJECT4 VARCHAR(255) DEFAULT 0,
    PROJECT5 VARCHAR(255) DEFAULT 0,
    FOREIGN KEY (USN) REFERENCES users(userid) ON DELETE CASCADE
  )`,(err, result) => {
    if (err) {
      console.error("Error creating project table:", err.message);
    } else {
      console.log("project table created or already exists");
    }

    // Close the MySQL connection
    // con.end();
  }
);
})








