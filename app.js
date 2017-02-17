var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var passport = require('passport');
var passportTwitter = require('../auth/twitter');
var config = require('./_config.js');
var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');
var User = require('./models/user');



var index = require('./routes/index');
var users = require('./routes/users');

// *** mongoose *** //
var url = process.env.MONGODB_URI;
mongoose.connect(url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
 secret: 'keyboard cat',
 resave: true,
 saveUninitialized: true
}));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

app.use('/', index);
app.use('/users', users);

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.render('index', { searchResults: null, location: "Where are you?", logged: true });
  });
  
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
    
  } else {
  res.redirect('/');
  }
}

module.exports = app;
