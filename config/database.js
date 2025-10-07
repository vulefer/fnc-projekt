const mysql = require('mysql2');

//Database config
const dbConfig = {
    host: 'db1.ctqiqyycmxj7.eu-north-1.rds.amazonaws.com',
    user: 'admin', 
    password: 'OvajSuleJeSpaner123!',
    database: 'fnc_database',
    port: 3306,
    charset: 'utf8mb4'
};

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true  
});

const promisePool = pool.promise();

async function testConnection() { //ovo samo za testiranje konekcije
    try {
        const connection = await promisePool.getConnection();
        console.log(' Database connected successfully!');
        connection.release();
        return true;
    } catch (error) {
        console.error(' Database connection failed:', error.message);
        return false;
    }
}

module.exports = {
    pool: promisePool,
    testConnection
};
