const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/courses', pageController.getCoursesPage);
router.get('/dashboard', pageController.getDashboardPage);
router.get('/contact', pageController.getContactPage);
  
  
  

module.exports = router;