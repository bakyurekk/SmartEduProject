const express = require('express');
const mongoose = require('mongoose');
const pageRouters = require('./routes/pageRoute');
const courseRouter = require('./routes/courseRoute');

const app = express();

// Connect DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected successfuly');
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//Midelewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTERS
app.use(pageRouters);
app.use(courseRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
