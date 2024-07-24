import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Aimogasta07!',
    database: 'new_app'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

export default connection;
