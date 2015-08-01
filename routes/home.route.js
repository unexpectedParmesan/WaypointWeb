var express    = require('express');
var path       = require('path');
var app        = express();
var homeRouter = express.Router();

homeRouter.get('/', authCheck, function (req, res) {
  res.location('/home');
  res.sendFile(path.resolve(__dirname + '/../public/home.html'));
});

function authCheck(req, res, next){
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = homeRouter;