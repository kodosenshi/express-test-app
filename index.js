const express = require('express');
const session = session = require('express-session');
const path = require('path');
const passport = require('passport');

require('./strategies/passport-local')(passport);

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

const app = express();
const port = process.env.PORT || 8080;

const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({ extended: false });

app.use(session({ secret: 'the cat said woof' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(parser.json());

const expressValidator = require('express-validator');

app.use(expressValidator({
    customValidators: {
      isImage: function(value, filename) {
        const extension = (path.extname(filename)).toLowerCase();
        return ['.gif', '.jpg', '.jpeg', '.png', '.svg'].indexOf(extension) !== -1;
      }
    }
  }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const articlesController = require('./controllers/articles');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');

app.get('/', articlesController.get);
app.get('/articles', articlesController.get);
app.get('/articles/create', sessionsController.isAuthenticated, articlesController.new);
app.post('/articles/create', uploadRequestHandler.single('image'), articlesController.post);
app.post('/user/signup', urlencodedParser, urlencodedParser, (req, res, next) => {
    passport.authenticate('local-signup', (err, user) => {
        console.log('===========', err)
        usersController.create(req, res, err)
    })(req, res, next);
});
app.get('/user/signup', usersController.new);
app.get('/login', sessionsController.login);
app.post('/login', urlencodedParser, (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        sessionsController.new(req, res, err, user)
    })(req, res, next);
});

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