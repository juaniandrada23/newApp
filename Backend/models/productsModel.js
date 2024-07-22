const db = require('../config/dbConfig');

const Product = {};

Product.findAllProducts = (callback) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) callback(err, null);
        else callback(null, results);
    });
};

Product.findProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) callback(err, null);
        else callback(null, results[0]);
    });
};


module.exports = Product;
