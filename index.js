// require Express, the framework we'll use for building
// node based web apps.
const express = require('express');

// create a new app
const app = express();

const port = process.env.PORT || 8080;

// Remember node doesn't give us the body data from a POST request
// we must use middleware for that, this package does that for us
// CHECKOUT VALIDATION https://github.com/ctavan/express-validator
const parser = require('body-parser');
const expressValidator = require('express-validator');

// lets get the body content from body urlencoded data (like formData) and json
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// Used for input validation - remember assume all input is bad!
// so lets use a tool designed to make sure we're not saving
// anything bad
app.use(expressValidator());

app.use(express.static('public'));

// Tell our app we want to use the 'ejs' template rendering engine
app.set('view engine', 'ejs');

const articlesController = require('./controllers/articles');

app.get('/', articlesController.get);
app.get('/articles', articlesController.get);
app.get('/articles/create', articlesController.new);
app.post('/articles/create', articlesController.post);
app.get('/articles/:id', articlesController.show);
app.post('*', articlesController.notFound);

const server = app.listen(port, () => {
    console.log(`started port ${port}`)
});