var express             = require('express');
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var session             = require('express-session');
var passport            = require('passport');
var FacebookStrategy    = require('passport-facebook').Strategy;
var environment         = require('./environment.js');

// ROUTERS
var indexRouter         = require('./routes/index.route');
var authRouter          = require('./routes/auth.route');
var homeRouter          = require('./routes/home.route');
var logoutRouter        = require('./routes/logout.route');
var usersRouter         = require('./routes/users.route');
var questsRouter        = require('./routes/quests.route');

var db                  = require('./db/config.js');
var app                 = express();

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
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/quests', questsRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);

// APP SETTINGS
console.log(console.log(environment.ENV));
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});

module.exports = app;
