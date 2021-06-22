const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

router.get('/users/dashboard', authMiddleware, authController.getDashboardPage);

router.post(
  '/users/signup',
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  authController.createUser
);

router.delete('/users/:id', authController.deleteUser);

router.post('/users/login', authController.loginUser);
router.get('/users/logout', authController.logoutUser);


module.exports = router;
