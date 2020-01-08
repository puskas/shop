const mysql = require('mysql')

console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_NAME)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)


const connection = mysql.createConnection({
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  database : process.env.DB_NAME,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD
})

connection.connect((err) => {
  if (err) return console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
  console.log('you are now connected to mysql....')
})

module.exports = connection;