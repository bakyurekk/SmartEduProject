const bcrypt = require('bcrypt');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');



exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userId });

  res.status(200).render('dashboard', {
    pageName: 'dashboard',
    user,
    categories,
    courses,
  });
};


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          // User SESSION
          req.session.userId = user._id;
          res.status(200).redirect('/users/dashboard');
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: 'Bed request',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

