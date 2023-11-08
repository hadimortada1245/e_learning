const mysql = require('mysql2');
const con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'learning_platform',
});

module.exports = con;
