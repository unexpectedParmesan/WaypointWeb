var express             = require('express');
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var session             = require('express-session');
var passport            = require('passport');
var FacebookStrategy    = require('passport-facebook').Strategy;
var questController     = require('./controllers/questController.js');
var waypointController  = require('./controllers/waypointController.js');
var userController      = require('./controllers/userController.js');
var User                = require('./db/models/user.js');


var db                  = require('./db/config.js');
var app                 = express();

var FB_APP_ID           = '943850322345964';
var FB_APP_SECRET       = '2ec70a44be83edce3db4cbf4d25d959f';

// MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ 
  secret: 'keyboard cat',
  resave: false, 
  saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());

// Establish sessions
passport.serializeUser(function(user, done){
  console.log('serializeUser');
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  console.log('deserializeUser');
  console.log(obj);
  return done(null, obj);
});

// configure passport-facebook auth strategy 
passport.use(new FacebookStrategy({
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos']
  }, 
  function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
    // associate profile returned with a user in DB
    // return user from DB
    console.log('profile id', profile.id);
    console.log('profile name', profile.displayName);
    console.log('profile pic', profile.picture);

      var user = new User({
        facebook_id: profile.id
        }).fetch().then(function(user) {
          if (user) {
            return user;
          } else {
            var newUser = new User({
              facebook_id: profile.id,
              name: profile.displayName,
              profile_pic: ''
            });
            newUser.save().then(function(user) {
              return user;
            });
          }
        });

        console.log('user!!!');
        console.log(user);
        return done(null, user);
    });
  }
))

// handle auth request
app.get('/auth/facebook', 
  passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_friends']}), 
  function(req, res){
    // request is redirected to facebook--this function is not called.
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/login'}), 
  function(req, res){
    console.log('in facebook callback')
    res.send("hello, dude!")
  })

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// APP SETTINGS

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});

/////////////
// QUEST CRUD
/////////////

app.get('/', function(req, res){
  if (!req.body.user) {
    res.redirect('/login');
  } else {
    res.redirect('/home');
  }
});

app.get('/login', function(req, res){
  res.location('/login');
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/home', authCheck, function(req, res){
  res.location('/home');
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/quests', function(req, res) {
  questController.getAllQuests(req, res);
});

app.get('/quests/:questId', function(req, res) {
	questController.getOneQuest(req, res);
});

app.post('/quests', function(req, res) {
  questController.makeQuest(req, res);
});

app.put('/quests/:questId', function(req, res) {
  questController.updateQuest(req, res);
});

app.delete('/quests/:questId', function(req, res) {
  questController.deleteQuest(req, res);
});


/////////////////
// WAYPOINT CRUD
////////////////

app.get('/quests/:questId/waypoints', function(req, res) {
  waypointController.getWaypoints(req, res);
});

app.post('/quests/:questId/waypoints', function(req, res) {
  waypointController.makeWaypoint(req, res);
});

app.put('/quests/:questId/waypoints/:waypointId', function(req, res) {
  waypointController.updateWaypoint(req, res);
});

app.delete('/quests/:questId/waypoints/:waypointId', function(req, res) {
  waypointController.deleteWaypoint(req, res);
});

//////////////
// USER CRUD
/////////////

app.get('/users', function(req, res) {
  userController.getAllUsers(req, res);
});

app.get('/users/:facebookId/createdQuests', function(req, res) {
  userController.getCreatedQuests(req, res);
});

app.get('/users/:facebookId', function(req, res) {
  userController.getUser(req, res);
});

app.post('/users/:facebookId', function(req, res) {
  userController.makeUser(req, res);
});

app.get('/users/:facebookId/activeQuests', function(req, res) {
  userController.getActiveQuests(req, res);
});

app.post('/users/:facebookId/activeQuests/:questId', function(req, res) {
  userController.findCreateActiveQuest(req, res);
});

app.put('/users/:facebookId/activeQuests/:questId', function(req, res) {
  userController.updateActiveQuest(req, res);
});

app.delete('/users/:facebookId/activeQuests/:questId', function(req, res) {
  userController.deleteActiveQuest(req, res);
});

// AUTH CHECK
function authCheck(req, res, next){
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect('/login');
}

// app.use('/', router);

module.exports = app;
