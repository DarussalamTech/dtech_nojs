/**
 * 
 * @param {type} db
 * @returns {unresolved}
 * all types of jade calls
 */

exports.list = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');  // here users is the collection that user has created
        collection.find({}, {}, function(e, docs) {
            console.log(docs);
            res.render('jade/userlist.jade', {
                "userlist": docs
            });
        });
    };
};


/*
 * Adding new users using jade
 */
exports.newuser = function(req, res) {
    res.render('jade/newuser.jade', {title: 'Add New User'});
};

exports.addjadeuser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, forward to success page
                res.redirect("userlist");
                // And set the header so the address bar doesn't still say /adduser
                //res.location("userlist");
            }
        });

    }
}