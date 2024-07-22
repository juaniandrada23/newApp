const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const products = require('../controllers/Products');
const { verifyToken, isAdmin, isClient } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/admin', verifyToken, isAdmin);
router.get('/client', verifyToken, isClient);

router.get('/products', products.getAllProducts);
router.get('/products/:id', products.getProductById);

module.exports = router;
