const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/users/signup', authController.createUser);
router.post('/users/login', authController.loginUser);
module.exports = router;
