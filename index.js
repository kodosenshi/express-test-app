// require Express, the framework we'll use for building
// node based web apps.
const express = require('express');

// Remember node doesn't give us the body data from a POST request
// we must use middleware for that, this package does that for us
const parser = require('body-parser');

const indexController = require('./controllers/index');
const blogDetailController = require('./controllers/blogDetail');

// create a new app
const app = express();

app.use(express.static('public'));

// Tell our app we want to use the 'ejs' template rendering engine
app.set('view engine', 'ejs');

// store some article data we'll pass to our template
// eventually we'll use an external data source like a Database

app.use(parser.urlencoded({ extended: false }));

indexController(app);
blogDetailController(app);

const server = app.listen(8080, () => {
    console.log('started')
});