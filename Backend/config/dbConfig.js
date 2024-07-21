const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'juani123!',
    database: 'new_app'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = connection;
