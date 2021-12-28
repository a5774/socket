const mysql = require('mysql2');
const config = require('./config')

let pool = mysql.createPool({
    host:config.SQL_HOST,
    port:config.SQL_PORT,
    database:config.SQL_DATABASE,
    user:config.SQL_USER,
    password:config.SQL_PASSWORD,
    connectionLimit:100,
    waitForConnections:true,
    queueLimit:5,
    // acquireTimeout:3000
})
let poolPromise = pool.promise();

module.exports = {
    // callback 
    pool,
    // promise 
    poolPromise
}

