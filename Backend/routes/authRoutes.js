const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/admin', authMiddleware.verifyToken, authMiddleware.isAdmin, (req, res) => {
    res.status(200).send('Admin content');
});

module.exports = router;
