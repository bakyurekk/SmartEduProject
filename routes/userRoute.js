const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/users/signup', authController.createUser);
router.post('/users/login', authController.loginUser);
router.get('/users/logout', authController.logoutUser);
router.get('/users/dashboard', authMiddleware, authController.getDashboardPage);

module.exports = router;
