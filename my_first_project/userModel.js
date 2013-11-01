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
    last_name: 'ubaid',
    first_name: 'khan',
    setAtrribute: function(req) {
        console.log(req.param('last_name'));
        this.last_name = req.param('last_name');
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