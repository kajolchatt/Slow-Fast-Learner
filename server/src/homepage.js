
require("./app1");
const { express,con,cors,app } = require('./app1');
app.use(cors());
app.use(express.json());
app.post('/home',(req,res)=>{
  console.log(req.body);
  const usn=req.body.usn;
  const name=req.body.name;
  const email=req.body.email;
  const pno=req.body.pno;
  con.query('INSERT INTO student (USN,NAME,EMAIL,PHONE_NUMBER) VALUES (?,?,?,?)',[usn,name,email,pno],(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send("values inserted");
    }
  });
});