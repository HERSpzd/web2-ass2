const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crowdfunding_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

connection.query('SELECT * FROM FUNDRAISER', (err,rows) => {
  if(err) throw err;
  
  console.log(rows);
  
});

connection.query('SELECT * FROM CATEGORY', (err,rows) => {
  if(err) throw err;
  
  console.log(rows);
  
});