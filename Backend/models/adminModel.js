const db = require('../config/dbConfig');

const Admin = {};

Admin.seeAllOrders = (callback) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
    });
};

module.exports = Admin;