const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("Pool de conexões com o MySQL criado.");

module.exports = connection.promise(); // Usando .promise() para poder usar async/await