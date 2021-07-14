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

var name,pass;
function get(){
app.get('/',(req,res)=>{
    MERN.find({userName:name,password:pass}).then((data)=>{
        res.status(200).json({data})}
    )
})
}
app.post('/add',(req,res)=>{
        MERN.findOneAndUpdate({userName:name,password:pass},{ $set: { body: req.body} } ,  
        {upsert: true},function(err,doc) {
            if (err) { throw err; }
            else {    
                 console.log("Updated");
                 res.status(200).json({
                     message:'success'
                 })
                 }}
    )
    get()
})


app.post("/login", (req, res) => {
    const {userName,password} = req.body;
    name=userName
    pass=password
    get()
    MERN.find({userName:userName,password:password})
    .then(x=>{
        if(x.length!=0)
        {
            const name = {name: userName};
            const authToken = generateAuth(name);
            res.status(200).json({
                loggedIn: true,
                authToken,
                message:'success'
            })}
    })
})

app.post('/signup',(req,res)=>{
    const {userName,password}=req.body
    MERN.find({userName:userName,password:password})
    .then(x=>{
        if(x.length==0){
            MERN.create(req.body);
            res.status(200).json({
                message:'created'
            })
        }
        else{
            res.status(400).json({
                message:'failed'
            })
        }
    })
})


app.get("/secure-posts", authenticator, (req, res) => {
    res.status(200).json({
        message: "success",
    });
});


function generateAuth(user) {
    return jwt.sign(user, process.env.SERVER_SIDE_SECURITY_KEY);
}



module.exports=app;