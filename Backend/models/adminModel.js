import db from '../config/dbConfig.js';

const Admin = {};

Admin.seeAllOrders = (callback) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
    });
};

export default Admin;
