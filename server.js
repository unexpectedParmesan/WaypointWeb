var express             = require('express');
var bodyParser          = require('body-parser');
var passport            = require('passport');
var FacebookStrategy    = require('passport-facebook').Strategy;
var questController     = require('./controllers/questController.js');
var waypointController  = require('./controllers/waypointController.js');
var userController      = require('./controllers/userController.js');

var db                  = require('./db/config.js');
var app                 = express();

var FB_APP_ID           = '943850322345964';
var FB_APP_SECRET       = '2ec70a44be83edce3db4cbf4d25d959f';

// MIDDLEWARE
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Establish sessions
passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  return done(null, obj);
});

// configure passport-facebook auth strategy 
passport.use(new FacebookStrategy({
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }, 
  function(accessToken, refreshToken, profile, done){
    process.nextTick(function(){
    // associate profile returned with a user in DB
    // return user from DB

    });
  }
))

// handle auth request
app.get('/auth/facebook/callback', function(req, res){
  // authenticate with passport
  passport.authenticate();
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
  res.send('/index.html');
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
function authCheck(){

}

// app.use('/', router);

module.exports = app;
