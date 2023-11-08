const mysql = require('mysql2');
const con = mysql.createPool({
  host: 'bpo43bwtccfzy2hu7f2q-mysql.services.clever-cloud.com',
  user: 'u5zdk7lgt3twetdk',
  password: '2Q6Cx7zSQSvim1VjeUL5',
  database: 'bpo43bwtccfzy2hu7f2q',
});

module.exports = con;
