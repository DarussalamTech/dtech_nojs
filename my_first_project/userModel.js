/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
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
 */
var UserModel = {
//    last_name: 'u',
    first_name: 'as',
    last_name: '',
    email: '',
    setAtrribute: function(req, db) {

        var collection = db.get('userCollection');
        var infor = collection.findById(req.params.id, function(error, info) {
            this.first_name = "kiu";
            this.first_name = JSON.stringify(info.first_name);
            this.last_name = JSON.stringify(info.last_name);
            this.email = JSON.stringify(info.email);
            console.log('Success: ' + this.email);
            return info;
        });

        //console.log(infor[0]);
        console.log(infor['email']);


//        console.log(req.param('last_name'));
//        this.last_name = req.param('last_name');
    },
    save: function(req) {
        if (this.last_name == "" || this.first_name == "") {
            return false;
        }
        else {
            //save 
            return true;
        }
    }

};
exports.UserModel = UserModel;