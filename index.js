const express = require('express');
const session = require('express-session');
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
const expressValidator = require('express-validator');

app.use(session({ 
    secret: 'the cat said woof',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(parser.json());
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
const isAuthenticated = sessionsController.isAuthenticated;

// articles
app.get('/', articlesController.get);
app.get('/articles', articlesController.get);
app.get('/articles/create', isAuthenticated, articlesController.new);
app.post('/articles/create', isAuthenticated, uploadRequestHandler.single('image'), articlesController.post);
app.post('/articles/:id', urlencodedParser, articlesController.delete);
app.delete('/articles/:id', articlesController.delete);
app.get('/articles/:id', articlesController.show);

// users
app.post('/user/signup', urlencodedParser, (req, res, next) => usersController.create(req, res, next, passport));
app.get('/user/signup', usersController.new);

// sessions
app.get('/login', sessionsController.login);
app.get('/logout', sessionsController.logout);
app.post('/login', urlencodedParser, (req, res, next) => sessionsController.new(req, res, next, passport));

// fallback
app.get('*', articlesController.notFound);

const server = app.listen(port, () => {
    console.log(`started port ${port}`)
});
