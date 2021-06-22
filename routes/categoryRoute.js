const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/categories', categoryController.createCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
router.put('/categories/:slug', categoryController.updateCategory);
module.exports = router;
