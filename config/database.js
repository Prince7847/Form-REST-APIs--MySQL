const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();

// connection with database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'curd_api',
})

connection.connect((e)=>{
  if(e) throw e;
   console.log('connection successful')
})

module.exports = connection;