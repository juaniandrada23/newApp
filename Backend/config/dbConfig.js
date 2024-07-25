import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

export default connection;
