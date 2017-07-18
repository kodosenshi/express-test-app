// require Express, the framework we'll use for building
// node based web apps.
const express = require('express');

// Remember node doesnt give use the body data from a POST request
// we must use middleware for that, this package does that for us
const parser = require('body-parser');

// create a new app
const app = express();

// Tell our app we want to use the 'ejs' template rendering engine
app.set('view engine', 'ejs');

// store some simple data we'll pass to our templates as a test
const classData = {
  title: 'PTWDI',
  students: [
    'pj',
    'andre'
  ]
}

//parses requests with the content type of `application/json` by default
// but since our form is using FormData instead of JSON we need to use the right parser
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
app.use(parser.urlencoded({ extended: false }));

// setup a route for our index page.
// This is similar to going to http://cnn.com/
// For our app the url is http://localhost:3000/
app.get('/', (request, response) => {

    // render our index.ejs template
    // by default templates are looked for in the "views" directory
    // and pass the object "classData" to your template
    response.render('index', classData);
});

// create a route for our about page
// For our app the url is http://localhost:3000/about
app.get('/about', (request, response) => {

    // render our about.ejs template
    // by default templates are looked for in the "views" directory
    response.render('about');
});

// create a route to submit our form
// For our app the url is http://localhost:3000/submit
// NOTE this is a POST not a GET there for "app.post"
app.post('/submit', (request, response) => {

    // the object "request.body"
    // is available because of the body-parser middleware
    // we required above.
    const color = request.body.color;

    // render the "order-success" template
    // passing it some custom data
    // We can imagine added someting to a cart
    // on an e-commerce site like nike.com
    // and made and order where we want to show
    // the user a receipt
    response.render('order-success', {
        total: '400.50',
        color: request.body.color,
        trackingInfo: {
            type: 'FEDEX'
        }
    });
});

// we try to start our webserver listening on PORT 3000
// this means to see the webpage,
// open your browser to http://localhost:3000
// that will render the "/" route above

const server = app.listen(port, () => {
    console.log('server started on port', server.address().port);
});