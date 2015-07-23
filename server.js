var express             = require('express');
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var session             = require('express-session');
var passport            = require('passport');
var FacebookStrategy    = require('passport-facebook').Strategy;

// ROUTERS
var indexRouter         = require('./routes/index.route');
var authRouter          = require('./routes/auth.route');
var loginRouter         = require('./routes/login.route');
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
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/quests', questsRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);


// APP SETTINGS
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});

// app.use('/', router);

module.exports = app;
