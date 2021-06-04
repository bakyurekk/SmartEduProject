const express = require('express');

const app = express();

const PORT = 3000;


//ROUTERS
const pageRouters = require('./routes/pageRoute');

// TEMPLATE ENGİNE
app.set('view engine', 'ejs');


//Midelewares
app.use(express.static('public'));


//ROUTERS
app.use(pageRouters);




app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
