const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:slug', courseController.getCourse);
router.post(
  '/courses',
  roleMiddleware(["teacher", "admin"]),
  courseController.createCourse
);
router.post('/courses/enroll', courseController.enrollCourse);
router.post('/courses/release', courseController.releaseCourse);
module.exports = router;
