import db from '../config/dbConfig.js';

const Order = {};

Order.createOrder = (userId, total, shippingAddress, status, comments) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO orders (user_id, order_date, total, shipping_address, status, comments) VALUES (?, NOW(), ?, ?, ?, ?)', 
      [userId, total, shippingAddress, status, comments], 
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

Order.createOrderDetail = (orderId, productId, quantity, price) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', 
      [orderId, productId, quantity, price], 
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

Order.seeAllOrderDetails = (orderId, callback) => {
  db.query('SELECT p.image, od.order_id, p.name,od.quantity, p.price, o.total FROM order_details od INNER JOIN orders o ON o.id = od.order_id INNER JOIN products p ON p.id = od.product_id WHERE order_id = ?', [orderId], (err, results) => {
      if (err) callback(err, null);
      else callback(null, results);
  });
};

export default Order;
