const Sequelize=require('sequelize')
const dotenv=require('dotenv')
const mysql=require("mysql2/promise")

dotenv.config();

const pool=mysql.createPool({
    database:process.env.database-name,
    user:process.env.user,
    password:process.env.password,
    host:process.env.host,
    waitForConnections:true,
    connectionLimit:10,
    port:3306,
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
