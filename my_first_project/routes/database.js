/**
 * @param {type} db
 * @returns {unresolved}
 * Used for html rendreing..
 */
exports.test = function(db) {
    return function(req, res) {
        var collection = db.get('userCollection');  // here users is the collection that user has created
        collection.find({}, {}, function(e, docs) {
            res.render('html/users', {
                title: "List of Users",
                userlist: docs
            });
        });
    };
};
/**
 * @type typeCreating new 
 */
exports.newDbUserForm = function(req, res) {
    res.render('html/newuserform', {title: 'Create new User using Html'});
};
/**
 * adding realdata to db collection
 */

exports.adduser = function(db) {
    return function(req, res) {
        // Get our form values.
        var userName = req.body.username;
        var userEmail = req.body.useremail;
        // Set our collection
        var collection = db.get('dtech_node');
        // Submit to the DB
        collection.insert({
            "username": userName,
            "email": userEmail
        }, function(err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, forward to success page
                res.redirect("users");
                // And set the header so the address bar doesn't still say /adduser
                //res.location("userlist");
            }
        });

    }
}

/**
 * displaying single user recored on based of
 * user_id
 */
exports.viewuser = function(db) {
    return  function(req, res) {
        var collection = db.get('userCollection');
        collection.findById(req.params.id, function(error, info) {
            console.log(info);
            res.render('html/viewuser',
                    {title: info.first_name + ' ' + info.last_name,
                        info: info});
        });
    };
}
/*
 * User Registration Form
 * rendering registration form
 */
exports.registerdb = function(db) {
    return function(req, res) {
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var password_1 = req.body.password_1;
        var password_2 = req.body.password_2;
        var contact = req.body.contact;
        var gender = req.body.gender;



        var Db = require('mongodb').Db,
                MongoClient = require('mongodb').MongoClient,
                Server = require('mongodb').Server,
                ReplSetServers = require('mongodb').ReplSetServers,
                ObjectID = require('mongodb').ObjectID,
                Binary = require('mongodb').Binary,
                GridStore = require('mongodb').GridStore,
                Grid = require('mongodb').Grid,
                Code = require('mongodb').Code,
                BSON = require('mongodb').pure().BSON,
                assert = require('assert');

        var dbs = new Db('dtech_node', new Server('locahost', 27017));

        var collection = dbs.collection("user");
// Insert a single document
        collection.insert([{hello: 'world_safe1'}
            , {hello: 'world_safe2'}], {w: 1}, function(err, result) {
            assert.equal(null, err);

            // Fetch the document
            collection.findOne({hello: 'world_safe2'}, function(err, item) {
                assert.equal(null, err);
                assert.equal('world_safe2', item.hello);
            })
        });

    }
};



exports.update = function(db) {
    return  function(req, res) {
        console.log("Eroor in update" + req.param('id'));
        var collection = db.get('userCollection');
        collection.update({_id: req.param('id')}, {first_name: req.param('first_name'),
            last_name: req.param('last_name'),
            email: req.param('email'),
            contact: req.param('contact'),
            gender: req.param('gender')},
        function(error, result) {

            if (error)
            {
                console.log("Eroor in update");
            }
            else
            {
                res.redirect("users");
            }
        });
    }
}
exports.updatedb = function(db) {
    return  function(req, res) {
        var collection = db.get('userCollection');
        collection.findById(req.params.id, function(error, info) {

            //three to updateing then redirct
            res.render('html/update',
                    {title: info.first_name + ' ' + info.last_name,
                        id: req.params.id,
                        model: info});
        });
    };
}

exports.delete = function(db) {
    return function(req, res) {
        var collection = db.get('userCollection');
        collection.remove({_id: req.params.id}, function(error, succes) {
            res.redirect('/users')
        });
    }
}







//
//exports.update = function(db) {
//    return  function(req, res) {
//        console.log("Eroor in update" + req.param('id'));
//        var collection = db.get('userCollection');
//        collection.update({_id: req.param('id')},
//        {
//            first_name: req.param('first_name'),
//            last_name: req.param('last_name'),
//            last_name: req.param('email'),
//            last_name: req.param('contact'),
//            last_name: req.param('gender'),
//        },
//        function(error, result) {
//            if (error)
//            {
//                console.log("Eroor in update");
//            }
//            else
//            {
//                res.redirect("users");
//            }
//        });
//    }
//}