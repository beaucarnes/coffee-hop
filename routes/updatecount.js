var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = mongoose.model('visits');

/* GET users listing. */
router.post('/', function(req, res, next) {
  var placeID = req.body.id;
  var personID = "test" //req.user.someID
  console.log("getting updatecount page")
  console.log(JSON.stringify(req.body))
  Visit.findOne({placeID : placeID, personID : personID}, function(err, visit)  {
    if (visit) {
      Visit.findOneAndRemove({placeID : placeID, personID : personID}, function (err, item) {  
        res.send('removed');
      });
    } else {
      new Visit({placeID : placeID, personID : personID})
        .save(function(err, visit) {
          res.send('changed');
        });
    }
  });

});

module.exports = router;
