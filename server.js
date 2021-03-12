//Dependencies 

const express = require('express');

//const { v4 : uuidv4 } = require('uuid');


// Sets up express app for Heroku

const app = express();
const PORT = process.env.PORT || 3050;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// ROUTER - reads db.json file to to return notes saved as JSON
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// LISTNER
app.listen(PORT, () => {
    console.log(`APP listing on PORT: ${PORT}`);
});
