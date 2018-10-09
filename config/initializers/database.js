import config from 'nconf'
import mysql from 'mysql'
import logger from '../../lib/logger'

var pool  

export default {
    initPool() {
        
        pool = mysql.createPool({
            host     : config.get('MYSQL_SERVER'),
            user     : config.get('MYSQL_USER'),
            password : config.get('MYSQL_PASSWORD'),
            database : config.get('MYSQL_DATABASE')
        });

        pool.getConnection(function(err, connection) {
            if (err) {
                // console.log(err);
                logger.error('[DB] ' + err.code + ': ' + err.sqlMessage); // not connected!
            } 
            else if (connection) {
                logger.info('[DB] Database pool created!');
                connection.release();
            };
        });
        
    },
    getPool() {
        if (!pool) 
            this.initPool()
    
        return pool;
    },
    
    query(queryString) {
        let p = new Promise((resolve, reject) => {
            this.getPool().getConnection(function(err, connection) {
                // Use the connection
                connection.query(queryString, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();
                
                    // Handle error after the release.
                    if (error) {
                        logger.error(error);
                        reject(error)
                    }
                    // console.log(results)
                    resolve(results)
                    // Don't use the connection here, it has been returned to the pool.
                });
            });
        })
        return p
    }
}