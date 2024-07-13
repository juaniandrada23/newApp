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

User.findRolesByUserId = (userId, callback) => {
    db.query(
        'SELECT roles.name FROM roles INNER JOIN user_roles ON roles.id = user_roles.role_id WHERE user_roles.user_id = ?',
        [userId],
        (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        }
    );
};

User.findRoleByName = (roleName, callback) => {
    db.query('SELECT id FROM roles WHERE name = ?', [roleName], (err, results) => {
        if (err) callback(err, null);
        else callback(null, results[0].id);
    });
};

User.assignRole = (userId, roleId, callback) => {
    db.query('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId], (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
    });
};

module.exports = User;
