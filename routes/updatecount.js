var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = mongoose.model('visits');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var placeID = req.query.id;
  var userID = "test" // req.user.someID
  var count;
  
  Visit.find({placeID : placeID}, function(err, results) {
    count = results.length

  });
  
  
  
  Visit.findOne({placeID : placeID, personID : userID}, function(err, visit)  {
    if (visit) {
      Visit.findOneAndRemove({placeID : placeID, personID : userID}, function (err, item) {  
        res.send("" + --count);
      });
    } else {
      new Visit({placeID : placeID, personID : userID})
        .save(function(err, visit) {
          res.send("" + ++count);
        });
    }
  });

});

module.exports = router;
