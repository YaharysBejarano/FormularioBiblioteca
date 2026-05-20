require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USSER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "docentes_db",
});

connection.connect((err) => {
  if (err) {
    console.log("Error al conectar bd", err);
    return;
  }

  console.log("Conección exitosa....");
});

module.exports = connection;
