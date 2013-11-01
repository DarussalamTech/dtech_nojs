
/**
 * Module dependencies.
 */

var express = require('express')
        , routes = require('./routes')
        , user = require('./routes/user')
        , http = require('http')
        , path = require('path')
        , UserProvider = require('./userprovider').UserProvider;

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {layout: false});
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

var userProvider = new UserProvider('localhost', 27017);

//Routes

app.get('/', function(req, res) {
    userProvider.findAll(function(error, userInfo) {
        res.render('index', {
            title: 'Users',
            users: userInfo
        });
    });
});

app.get('/user/new', function(req, res) {
    res.render('user_new', {
        title: 'New Employee'
    });
});

//save new user
app.post('/user/new', function(req, res) {
    userProvider.save({
        first_name: req.param('first_name'),
        last_name: req.param('last_name'),
        email: req.param('email'),
        password1: req.param('password1'),
        password2: req.param('password2'),
        contact: req.param('contact'),
        gender: req.param('gender'),
    }, function(error, docs) {
        res.redirect('/');
    });
});

app.listen(3000);