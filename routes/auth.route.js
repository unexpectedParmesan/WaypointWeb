var express           = require('express');
var app               = express();
var passport          = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var authRouter        = express.Router();
var User              = require('../db/models/user.js');

var FB_APP_ID         = '943850322345964';
var FB_APP_SECRET     = '2ec70a44be83edce3db4cbf4d25d959f';

// Establish sessions
passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
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
      new User({
        facebook_id: profile.id
        }).fetch().then(function(user) {
          if (!user) {
            var newUser = new User({
              facebook_id: profile.id,
              name: profile.displayName,
              profile_pic: ''
            });

            newUser.save().then(function(user) {
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
  passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_friends']}), 
  function(req, res){
    // request is redirected to facebook--this function is not called.
  });

// successRedirect: '/home'
authRouter.get('/facebook/callback', 
  passport.authenticate('facebook', {failureRedirect: '/login', successRedirect: '/home'}));

module.exports = authRouter;