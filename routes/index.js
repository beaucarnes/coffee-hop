var express = require('express');
var router = express.Router();

// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'ArnyMwZa2JMxtel0wuODtg',
  consumer_secret: 'nzKWdyHnFRtNoB5a9OLdXLAO0fM',
  token: 'jK7OQnZpvbT_CXlXVq7U5rIo21pjf7eA',
  token_secret: 'YOMrcPaqVdbj-oV627591iqjLqU',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("getting home:" + req.isAuthenticated())
    var searchResults = [];
    if (req.query.location) {
      yelp.search({ term: 'coffee', location: req.query.location })
          .then(function (data) {
            for(var i in data.businesses) {
                searchResults.push({"id": data.businesses[i].id,
                                    "name": data.businesses[i].name,
                                    "snippet": data.businesses[i].snippet_text,
                                    "image_url": data.businesses[i].image_url
                })
            };
            
            res.render('index', { searchResults: searchResults, location: req.query.location, logged: req.isAuthenticated() });
          })
          .catch(function (err) {
            console.error(err);
            res.render('index', { searchResults: searchResults });
          });
    } else {
      res.render('index', { searchResults: null, location: "Where are you?", logged: req.isAuthenticated() });
    };

  
});

module.exports = router;
