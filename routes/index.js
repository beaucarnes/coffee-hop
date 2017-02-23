var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Visit = require('../models/visit');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'ArnyMwZa2JMxtel0wuODtg',
  consumer_secret: 'nzKWdyHnFRtNoB5a9OLdXLAO0fM',
  token: 'jK7OQnZpvbT_CXlXVq7U5rIo21pjf7eA',
  token_secret: 'YOMrcPaqVdbj-oV627591iqjLqU',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.returnTo = req.path;
  console.log(req.session.returnTo)
  Visit.find({}, function(err, visits) {
    
    var userID = "";
    var userName = "";
    
    if (req.isAuthenticated()) {
      console.log("index"+req.user.someID);
      userID = req.user.someID;
      userName = req.user.name;
    };
    
    var searchResults = [];
    var visitCount = {};
    var visiting = [];
    visits.forEach(function(visit) {
      visitCount[visit.placeID] = (visitCount[visit.placeID] || 0) + 1;
      // if (req.isAuthenticated() && visit.personID == userID) {
      if (visit.personID == userID) {
        visiting.push(visit.placeID);
      }
    });
    
    if (req.query.location) {
      yelp.search({ term: 'coffee', location: req.query.location })
          .then(function (data) {
            for(var i in data.businesses) {
                searchResults.push({"id": data.businesses[i].id,
                                    "name": data.businesses[i].name,
                                    "snippet": data.businesses[i].snippet_text,
                                    "image_url": data.businesses[i].image_url,
                                    "count": visitCount[data.businesses[i].id],
                                    "visiting": (visiting.indexOf(data.businesses[i].id) > -1)
                })

            };
            
            res.render('index', { searchResults: searchResults, location: req.query.location, visitCount: visitCount, logged: req.isAuthenticated(), name: userName });
          })
          .catch(function (err) {
            console.error(err);
            res.render('index', { searchResults: searchResults });
          });
    } else {
      res.render('index', { searchResults: null, location: "Where are you?", visitCount: visitCount, logged: req.isAuthenticated(), name: userName });
    };    
    
  });



  
});

module.exports = router;
