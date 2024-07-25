import db from '../config/dbConfig.js';

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

Product.updateStock = (id, quantity) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default Product;
