const mysql2 = require("mysql2/promise");
require("dotenv").config();

let pool;

const connection = () => {
  try {
    if (pool) {
      return pool;
    }
    pool = mysql2.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT ,
      waitForConnections: true,
      connectionLimit: 500,
      queueLimit: 15000,
    });
    return pool;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  connection,
};
