var mysql = require('mysql2');
var pool = mysql.createPool({
    "connectionLimit" : 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT  
});

exports.execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
  
                pool.query(query, params, (error, results, fields) => {
                    if(error) { 
                        reject(error)
                    } else {
                        resolve (results) }

                })
        })
    
}

exports.pool = pool;