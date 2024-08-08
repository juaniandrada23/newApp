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

Product.addNewProduct = (newProduct, callback) => {
  const query = 'INSERT INTO products (name, description, price, stock, image, created_at) VALUES (?, ?, ?, ?, ?, NOW())';

  db.query(query, [newProduct.name, newProduct.description, newProduct.price, newProduct.stock, newProduct.image], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

Product.removeProduct = (id, callback) => {
  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

Product.findFilteredProducts = (filters, callback) => {
  const { name, minPrice, maxPrice, sortOrder } = filters;
  let query = 'SELECT * FROM products WHERE 1=1';
  let queryParams = [];

  if (name) {
    query += ' AND name LIKE ?';
    queryParams.push(`%${name}%`);
  }

  if (minPrice !== undefined) {
    query += ' AND price >= ?';
    queryParams.push(minPrice);
  }

  if (maxPrice !== undefined) {
    query += ' AND price <= ?';
    queryParams.push(maxPrice);
  }

  if (sortOrder) {
    if (sortOrder === 'price-asc') {
      query += ' ORDER BY price ASC';
    } else if (sortOrder === 'price-desc') {
      query += ' ORDER BY price DESC';
    } else if (sortOrder === 'name-asc') {
      query += ' ORDER BY name ASC';
    } else if (sortOrder === 'name-desc') {
      query += ' ORDER BY name DESC';
    }
  }

  db.query(query, queryParams, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

export default Product;
