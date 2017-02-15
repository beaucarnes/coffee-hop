var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create User Schema
var Visit = new Schema({
 personID: String,
 placeID: String
},
{
  timestamps: true
});


module.exports = mongoose.model('visits', Visit);


