const mysql = require('mysql-promise');

let db = mysql();
db.configure({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pacridon'
});

module.exports = db;