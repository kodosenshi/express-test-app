const express = require('express');
const parser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

const classData = {
  title: 'PTWDI',
  students: [
    'pj',
    'andre'
  ]
}

//parses requests with the content type of `application/json`
app.use(parser.urlencoded({ extended: false }));

app.get('/', function(request, response) {
    response.render('index', classData);
});

app.get('/about', function(request, response) {
    response.render('about');
});

app.post('/submit', function(request, response) {
    //if a json payload is posted to `/submit`,
    //body-parser's json parser will parse it and
    //attach it as `request.body`.
    
    response.render('order-success', {
        total: '400.50',
        color: request.body.color,
        trackingInfo: {
            type: 'FEDEX'
        }
    });
});

const server = app.listen(4000, function () {
   console.log('server started on port', server.address().port);
});