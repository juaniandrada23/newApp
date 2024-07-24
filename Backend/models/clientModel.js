import db from '../config/dbConfig.js';

const Client = {};

Client.findOrdersById = (clientId, callback) => {
    db.query('SELECT * FROM orders WHERE user_id = ?', [clientId], (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
    });
};

export default Client;
