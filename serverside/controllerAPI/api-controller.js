var dbcon = require("../crowdfunding_db");
var connection = dbcon.getconnection();
connection.connect();
var express = require('express');
var router = express.Router();

router.get("/fundraisers", (req, res) => {
  connection.query(
    `SELECT f.*, c.NAME AS CATEGORY_NAME
    FROM FUNDRAISER f
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
    WHERE f.ACTIVE = true`,
    (err, records, fields) => {
      if (err) {
        console.error("Error while retrieve the data");
      } else {
        res.send(records);
      }
    })
})

router.get("/category", (req, res) => {
  connection.query("SELECT * from CATEGORY", (err, records, fields) => {
    if (err) {
      console.error("Error while retrieve the data");
    } else {
      res.send(records);
    }
  })
})


router.get("/research", (req, res) => {
  //搜索组织者
  if (!req.query.CITY && !req.query.CATEGORY_NAME) {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND f.ORGANIZER = ?`;
    var parameters = [req.query.ORGANIZER];

  } else if (!req.query.ORGANIZER && !req.query.CATEGORY_NAME) {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND f.CITY = ?`;  //搜索城市
    var parameters = [req.query.CITY];

  } else if (!req.query.ORGANIZER && !req.query.CITY) {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND c.NAME = ?`;  //搜索类别
    var parameters = [req.query.CATEGORY_NAME];



  } else if (!req.query.CATEGORY_NAME) {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND f.ORGANIZER = ? 
               AND f.CITY = ?`;  //搜索组织者，城市
    var parameters = [req.query.ORGANIZER, req.query.CITY];
  } else if (!req.query.CITY) {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND f.ORGANIZER = ? 
               AND c.NAME = ?`;  //搜索组织者，类别
    var parameters = [req.query.ORGANIZER, req.query.CATEGORY_NAME];
  } else if (!req.query.ORGANIZER) {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND f.CITY = ? 
               AND c.NAME = ?`;  //搜索城市，类别
    var parameters = [req.query.CITY, req.query.CATEGORY_NAME];
  } else {
    var query = `SELECT f.*, c.NAME AS CATEGORY_NAME
               FROM FUNDRAISER f
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
               WHERE f.ACTIVE = true 
               AND f.ORGANIZER = ?
               AND f.CITY = ?
               AND c.NAME = ?`;  // 搜索组织者，城市，类别
    var parameters = [req.query.ORGANIZER, req.query.CITY, req.query.CATEGORY_NAME];


  }

  connection.query(query, parameters,
    (err, records, fields) => {
      if (err) {
        console.error("Error while retrieve the data");
      } else {
        res.json(records);
      }
    });
});

router.get("/fundraisers/:id", (req, res) => {
  connection.query(`SELECT f.*, c.NAME AS CATEGORY_NAME
                    FROM FUNDRAISER f
                    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
                    WHERE F.ACTIVE = true 
                    AND FUNDRAISER_ID = ?` 
    , [req.params.id], (err, records, fields) => {
      if (err) {
        console.error("Error while retrieve the data");
      } else {
        res.send(records);
      }
    })
})

module.exports = router;