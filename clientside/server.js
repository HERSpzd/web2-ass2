const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const cors = require("cors");

const app=express();

app.use(cors());

//to parse URL-encoded & JSON data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));

//route to serve index.html
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});

//route to serve search_fundraisers.html
app.get("/search_fundraisers",(req,res)=>{
    res.sendFile(path.join(__dirname,"search_fundraisers.html"));
  });

app.listen(8080,()=>{
  console.log("Running in 8080");
});