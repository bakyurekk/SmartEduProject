const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:slug', courseController.getCourse);

router.post('/courses', courseController.createCourse);
module.exports = router;
