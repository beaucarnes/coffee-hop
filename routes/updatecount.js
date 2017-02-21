var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = mongoose.model('visits');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var placeID = req.query.id;
  console.log("getting request updatecount $$ "+placeID)
  Visit.findOne({placeID : placeID, personID : req.user.someID}, function(err, visit)  {
    console.log("!!!!!!!!!!!! 1")
    if (visit) {
      Visit.findOneAndRemove({placeID : placeID, personID : req.user.someID}, function (err, item) {  
         console.log("!!!!!!!!!!!! 2")
        res.send('removed');
      });
    } else {
       console.log("!!!!!!!!!!!! 3")
      new Visit({placeID : placeID, personID : req.user.someID})
        .save(function(err, visit) {
           console.log("!!!!!!!!!!!! 4")
          res.send('changed');
        });
    }
  });

});

module.exports = router;
