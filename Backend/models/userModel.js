const db = require('../config/dbConfig');

const User = {};

User.findByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) callback(err, null);
        else callback(null, results[0]);
    });
};

User.create = (userData, callback) => {
    db.query('INSERT INTO users SET ?', userData, (err, results) => {
        if (err) callback(err, null);
        else callback(null, results.insertId);
    });
};

module.exports = User;
