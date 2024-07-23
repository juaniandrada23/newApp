const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const products = require('../controllers/Products');
const admin = require('../controllers/Admin');
const client = require('../controllers/Client');
const { verifyToken, isAdmin, isClient } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/products', products.getAllProducts);
router.get('/products/:id', products.getProductById);

router.get('/orders', verifyToken, isAdmin, admin.getAllOrders);
router.get('/orders/:user_id', verifyToken, isClient, client.getMyOrders);

module.exports = router;
