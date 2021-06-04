const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageController');

router.get('/about', pageController.getAboutPage);
router.get('/', pageController.getIndexPage);
  
  
  

module.exports = router;