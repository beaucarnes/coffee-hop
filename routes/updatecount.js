var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = mongoose.model('visits');

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/auth/twitter');
	}
}

router.get('/', isLoggedIn, function(req, res, next) {
  var placeID = req.query.id;
  
  var userID = req.user.someID
  console.log("updatecount"+req.user.someID)

  var count;
  
  Visit.find({placeID : placeID}, function(err, results) {
    count = results.length

  });
  
  
  
  Visit.findOne({placeID : placeID, personID : userID}, function(err, visit)  {
    if (visit) {
      Visit.findOneAndRemove({placeID : placeID, personID : userID}, function (err, item) {  
        res.send("" + --count + " going");
      });
    } else {
      new Visit({placeID : placeID, personID : userID})
        .save(function(err, visit) {
          res.send("" + ++count + " going (including YOU!)");
        });
    }
  });

});

module.exports = router;
