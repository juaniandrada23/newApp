const Admin = require('../models/adminModel');

exports.getAllOrders = (req, res) => {
    Admin.seeAllOrders((err, orders) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(orders);
        }
    });
};