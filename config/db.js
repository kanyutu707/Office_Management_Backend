const Sequelize=require('sequelize')
const dotenv=require('dotenv')
const mysql=require("mysql2/promise")

dotenv.config();

const pool=mysql.createPool({
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
    
}
);

async function checkPoolConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the database!');
      connection.release();
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  checkPoolConnection()


module.exports=pool;