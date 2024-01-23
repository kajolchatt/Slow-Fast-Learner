const express=require("express");
const mysql=require("mysql");
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
const con=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"signup"
})

app.post('/signup',(req,res)=>{

    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;
    con.query("INSERT INTO login (name,email,password) VALUES (?,?,?)",[name,email,password],
        (err,result)=>{
        if(result){
            res.send(result);
        }
        else{
            res.send({message:"ENTER CORRECT ASKED DETAILS"})
        }
    })
})


app.post('/login',(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;
    con.query("SELECT * FROM login WHERE email=? AND password=?",[email,password],
        (err,result)=>{
        if(err){
            return res.json("Error");
        }
        if(result.length>0){
            return res.json("Success");
        }
        else{
            return res.json("Fail");
        }
    })
})
app.listen(8081,()=>{
    console.log("listening");
});