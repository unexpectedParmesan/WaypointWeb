var express           = require('express');
var app               = express();
var passport          = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var authRouter        = express.Router();
var User              = require('../db/models/user.js');
var baseURL           = require('../environment');

var FB_APP_ID         = (baseURL === 'https://waypointbeta.herokuapp.com') ? '943850322345964' : '423908461151072';
var FB_APP_SECRET     = (baseURL === 'https://waypointbeta.herokuapp.com') ? '2ec70a44be83edce3db4cbf4d25d959f' : 'ea74d544c45eebd157ffaf1087aa3f9b';

// Establish sessions
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// configure passport-facebook auth strategy 
passport.use(new FacebookStrategy({
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: baseURL + ':3000' + '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos']
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile);
  process.nextTick(function () {
  // associate profile returned with a user in DB
  // return user from DB
    new User({
      facebook_id: profile.id
    }).fetch().then(function (user) {
      console.log(user);
      if (!user) {
        var newUser = new User({
          facebook_id: profile.id,
          name: profile.displayName,
          profile_pic: ''
        });

        newUser.save().then(function (user) {
          return done(null, user);
        });
      } else {
        return done(null, user);
      }
    });
  });
}));

// handle auth request
authRouter.get('/facebook',
  passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_friends']}));

// successRedirect: '/home'
authRouter.get('/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/', successRedirect: '/home'}));

module.exports = authRouter;