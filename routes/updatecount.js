var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = mongoose.model('visits');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var placeID = req.query.id;
  console.log()
  Visit.findOne({placeID : placeID, personID : req.user.someID}, function(err, visit)  {
    if (visit) {
      Visit.findOneAndRemove({placeID : placeID, personID : req.user.someID}, function (err, item) {  
        res.send('removed');
      });
    } else {
      new Visit({placeID : placeID, personID : req.user.someID})
        .save(function(err, visit) {
          res.send('changed');
        });
    }
  });

});

module.exports = router;
