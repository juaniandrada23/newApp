const db = require('../config/dbConfig');

const Client = {};

Client.findOrdersById = (user_id, callback) => {
    db.query('SELECT * FROM orders WHERE user_id = ?', [user_id], (err, results) => {
        if (err) callback(err, null);
        else callback(null, results[0]);
    });
};

module.exports = Client;