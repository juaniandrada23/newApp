const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/admin', [authMiddleware.verifyToken, authMiddleware.isAdmin]);
router.get('/client', [authMiddleware.verifyToken, authMiddleware.isClient]);

module.exports = router;
