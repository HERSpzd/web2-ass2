var express = require('express');
const cors = require("cors");

var app = express();
app.use(cors());

var crowedfundingAPI = require("./controllerAPI/api-controller");


app.use("/api/crowedfunding", crowedfundingAPI);
app.listen(3060);
console.log("Server up and running on port 3060");