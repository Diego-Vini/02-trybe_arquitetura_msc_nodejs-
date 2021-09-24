const mysql = require('mysql2/promise');
require('dotenv').config();

const PASSWORD = process.env.PASSWORD;

const connection = mysql.createPool({
  user: 'root',
  password: PASSWORD,
  port: 3307,
  host: 'localhost',
  database: 'cep_lookup'
});

module.exports = connection;