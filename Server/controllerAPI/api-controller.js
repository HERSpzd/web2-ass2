var dbcon = require("../crowdfunding_db");
var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();

router.get("/", (req, res)=>{
	connection.query("SELECT * from FUNDRAISER", (err, records, fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})

router.get("/fundraisers", (req, res)=>{
 connection.query(
   `SELECT f.*, c.NAME AS CATEGORY_NAME
    FROM FUNDRAISER f
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
    WHERE f.ACTIVE = true; `, 
   (err, records, fields)=> {
    if (err) {
      console.error("Error while retrieve the data");
    } else {
      res.send(records);
    }
 })
})

module.exports = router;