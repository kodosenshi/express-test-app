// require Express, the framework we'll use for building
// node based web apps.
const express = require('express');
const path = require('path');

// handle file uploads
const multer  = require('multer');

const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        const extension = (path.extname(file.originalname)).toLowerCase();
        cb(null, file.fieldname + '-' + Date.now() + extension)
    } 
});


const uploadRequestHandler = multer ({ storage: storage });

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
app.use(expressValidator({
    customValidators: {
      isImage: function(value, filename) {
        const extension = (path.extname(filename)).toLowerCase();
        return ['.gif', '.jpg', '.jpeg', '.png', '.svg'].indexOf(extension) !== -1;
      }
    }
  }));

app.use(express.static('public'));

// Tell our app we want to use the 'ejs' template rendering engine
app.set('view engine', 'ejs');

const articlesController = require('./controllers/articles');

app.get('/', articlesController.get);
app.get('/articles', articlesController.get);
app.get('/articles/create', articlesController.new);
app.post('/articles/create', uploadRequestHandler.single('image'), articlesController.post);

// to delete in a form we need to use POST, why?
// https://stackoverflow.com/questions/165779/are-the-put-delete-head-etc-methods-available-in-most-web-browsers
app.post('/articles/:id', (request, response) => {
    // if _method == DELETE
    if (request.body._method === 'DELETE') {
        return articlesController.delete(request, response, () => {
            response.redirect('/');
        });
    }

    // we don't support post or put (yet) so just redirect user
    // if anything else
    response.redirect('/');
});

// delete is only handled from API calls
app.delete('/articles/:id', (request, response) => {
    return articlesController.delete(request, response, () => {
        // we're not handling errors
        response.json({"success": true});
    });  
});
app.get('/articles/:id', articlesController.show);
app.get('*', articlesController.notFound);

const server = app.listen(port, () => {
    console.log(`started port ${port}`)
});