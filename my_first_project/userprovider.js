var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

UserProvider = function(host, port) {
    this.db = new Db('dtech_node_db', new Server(host, port, {w: 1}));
    this.db.open(function() {
    });
};


UserProvider.prototype.getCollection = function(callback) {
    this.db.collection('userCollection', function(error, user_collection) {
        if (error)
            callback(error);
        else
            callback(null, user_collection);
    });
};

//find all employees
UserProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, user_collection) {
        if (error)
            callback(error)
        else {
            user_collection.find().toArray(function(error, results) {
                if (error)
                    callback(error)
                else
                    callback(null, results)
            });
        }
    });
};

//save new employee
UserProvider.prototype.save = function(user, callback) {
    this.getCollection(function(error, user_collection) {
        if (error)
            callback(error)
        else {
            if (typeof(user.length) == "undefined")
                user = [user];

            for (var i = 0; i < user.length; i++) {
                employee = user[i];
            }
            console.log(user);
            user_collection.insert(user, function() {
                callback(null, user);
            });
        }
    });
};

//return a single user info based on send user data
UserProvider.prototype.view = function(userId, callback) {
    console.log(userId);
//    var o_id = new BSON.ObjectIDcreateFromHexString(userId);
//
//    console.log(o_id);

    var userIdS = '527202d58631aaab12000001';
    this.getCollection(function(error, user_collection) {
        if (error)
            callback(error)
        else {
            user_collection.find({_id: userIdS}).toArray(function(error, results) {
                if (error)
                {
                    callback(error);
                }
                else {
                    console.log(userIdS);
                    console.log(results);
                    callback(null, results)

                }

            });
        }
    });
}

exports.UserProvider = UserProvider;





db = new Db('dtech_node_db', new Server('localhost', 27017, {w: 1}));
db.open(function() {
});
exports.updateProduct = function(req, res) {
    
    console.log('Erooror ');
    var product = req.body;
    db.collection("userCollection", function(err, collection) {
        collection.update({_id: req.params.id}, {first_name: 'ubaidupdated', last_name: 'ubaidupdated'}, function(err, success) {
            if (err)
            {
                console.log('Erooror ');
            }
            else
            {
                console.log(success.last_name);
                console.log('Record is Update');
                res.send(req.body);
            }


        });

    });
}