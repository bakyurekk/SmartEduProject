const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/contact', pageController.getContactPage);
router.get('/register', redirectMiddleware, pageController.getRegisterPage);
router.get('/login', redirectMiddleware, pageController.getLoginPage);


router.post('/contact', pageController.sendEmail);
module.exports = router;
