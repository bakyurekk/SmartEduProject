const Course = require('../models/Course');
const Category = require('../models/Category');

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter);
    const categories = await Category.find();

    res.status(200).render('courses', {
      pageName: 'courses',
      courses,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render('course', {
      pageName: 'course',
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      message: 'Success',
      course,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};
