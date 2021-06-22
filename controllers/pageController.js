const nodemailer = require('nodemailer');

const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.find().countDocuments({ role: 'student' });
  const totalTeachers = await User.find().countDocuments({ role: 'teacher' });
  res.status(200).render('index', {
    pageName: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    pageName: 'about',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    pageName: 'contact',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    pageName: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    pageName: 'login',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
      <li>Name:${req.body.name} </li>
      <li>Email:${req.body.email} </li>
    </ul>
    <h1>Message Details </h1>
    <p>${req.body.message}</p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'burkanakyurekk@gmail.com', // gmail acount
        pass: 'frphbxsteespzwbo', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `'"Smart EDU Contact Form" <${req.body.email}>'`, // sender address
      to: 'bakyurekk34@gmail.com', // list of receivers
      subject: 'Smart EDU Contact Form New Message ✔', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'We Received your message successfuly');
    res.status(200).redirect('/contact');
  } catch (err) {
    req.flash('error', `Something happend!`);
    res.status(200).redirect('/contact');
  }
};
