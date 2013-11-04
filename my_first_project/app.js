var express = require('express')
        , UserProvider = require('./userprovider').UserProvider;
var app = express();
/*
 * 
 * @type type
 * DEFINING MONGO SYSTEMS
 */
var routes = require('./routes');
var user = require('./routes/user');
var userlist = require('./routes/userlist');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/dtech_node_db');

var hbs = require('hbs');
var blogEngine = require('./blog');
var dbModel = require('./routes/database');

app.set('view engine', 'html');
//app.set('view engine', 'jade');

app.engine('html', hbs.__express);
app.use(express.bodyParser());
app.use(express.static('public'));
/*
 * Routes files
 */
app.get('/', function(req, res) {
    res.render('html/index', {title: "My Blog", entries: blogEngine.getBlogEntries()});
});
app.get('/about', function(req, res) {
    res.render('html/about', {title: 'About Us'});
});

app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('html/article', {title: entry.title, blog: entry});
});

/*
 * 
 * @type UserProvider
 * Model Oriented
 */



var userProvider = new UserProvider('localhost', 27017);
app.get('/register', function(req, res) {
    var userModel = require('./userModel');

    res.render('html/register', {
        title: 'New Employee',
        model: userModel['UserModel']

    });
});
//products = require('./products');
//
//app.get('/products/:PName', products.findByName);
//app.post('/products/:PName/:Type/:Description',products.addProduct);
//app.put('/products/:PName/:Type/:Description', products.updateProduct);
//app.delete('/products/:PName', products.deleteProduct);

//app.get('/register', function(req, res) {
//    res.render('html/register', {title: "User Registration"}); //rendering reg view
//});
app.post('/register', function(req, res) {
//    var userModel = require('./userModel');
//    var model = userModel['UserModel'];
//    model.setAtrribute(req);
//    if (model.save()) {
//        res.redirect('/users');
//    }

    res.render('html/register', {
        title: 'New Employee',
        /// model: model

    });
//    userProvider.save({
//        first_name: req.param('first_name'),
//        last_name: req.param('last_name'),
//        email: req.param('email'),
//        password1: req.param('password1'),
//        password2: req.param('password2'),
//        contact: req.param('contact'),
//        gender: req.param('gender'),
//    }, function(error, docs) {
//        res.redirect('/users');
//    });
});
//app.get('/viewuser/:id', function(req, res) {
//    userProvider.view({id: req.params.id}, function(error, userInd) {
//        console.log(userInd);
//        res.render('html/viewuser',
//                {
//                    title: 'User Info',
//                    userInd: userInd
//                });
//    });
//});


//app.get('/viewuser/:id', function(req, res) {
//    var collection = db.get('userCollection');
//    //collection.find({_id:req.params.id},{}, function(error, info) {
//    collection.findById(req.params.id, function(error, info) {
//        console.log(info);
//        res.render('html/viewuser',
//                {title: info.first_name + ' ' + info.last_name,
//                    userInd: info});
//    });
//});


//********************************MOdel end here********************..
//app.get('/users', function(req, res) {
//    res.render('users', {title: "User Lists",dbObject: database.list(db)});
//});
//Must follow single pattern as
app.get('/users', dbModel.test(db));
app.get('/newdbuser', dbModel.newDbUserForm); //Create Form Rout
app.post('/adduser', dbModel.adduser(db)); // post form data
app.get('/viewuser/:id', dbModel.viewuser(db)); // view individual data

//app.get('/update/:id', function(req, res) {
//    var userModel = require('./userModel');
//    var model = userModel['UserModel'];
//    model.setAtrribute(req,db);
////    if (model.save()) {
////        res.redirect('/users');
////    }
//    res.render('html/update', {
//        title: 'New Employee',
//        id: req.params.id,
//        model: userModel['UserModel']
//    }); //for view
//});


app.get('/update/:id', dbModel.updatedb(db)); //for update
app.post('/updatedb', dbModel.update(db)); //for update
app.get('/delete/:id', dbModel.delete(db)); //for update
//for jade html eng
app.get('/userlist', userlist.list(db));
app.get('/newuser', userlist.newuser);
app.post('/addjadeuser', userlist.addjadeuser(db));
/*
 * Routes file ends here
 */


app.listen(3000);