require("dotenv").config();
const { notStrictEqual } = require("assert")
const express=require("express")
const app=express()
const MERN=require("./schema")
const cors=require("cors")
const jwt = require('jsonwebtoken');
const authenticator = require("./AuthMiddleware");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    MERN.find({})
    .then((files)=>
    res.status(200).json({files}))  
})
app.post('/add',(req,res)=>{
    
     MERN
     .create(req.body)

})


app.post("/login", (req, res) => {
    const {userName,password} = req.body;
    if(userName==='sivanesh'&&password==='123'){
    const name = {name: userName};
    const authToken = generateAuth(name);
    res.status(200).json({
        loggedIn: true,
        authToken,
        message:'success'
    })}
})



app.use(authenticator);
app.get("/secure-posts", authenticator, (req, res) => {
    res.status(200).json({
        message: "Success",
    });
});


function generateAuth(user) {
    return jwt.sign(user, process.env.SERVER_SIDE_SECURITY_KEY);
}



module.exports=app;