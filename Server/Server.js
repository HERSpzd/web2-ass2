var express = require('express');
var app = express();
var crowedfundingAPI = require("./controllerAPI/api-controller");


app.use("/api/crowedfunding", crowedfundingAPI);
app.listen(3060);
console.log("Server up and running on port 3060");