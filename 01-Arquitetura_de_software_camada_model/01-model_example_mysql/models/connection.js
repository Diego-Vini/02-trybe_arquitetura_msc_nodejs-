const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'root',
  password: 'senha',
  port: 3307,
  host: 'localhost',
  database: 'model_example'
});

module.exports = connection;