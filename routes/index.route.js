var express     = require('express');
var app         = express();
var indexRouter = express.Router();

indexRouter.get('/', function (req, res) {
  if (!req.session.passport.user) {
    res.redirect('/login');
  } else {
    res.redirect('/home');
  }
});

module.exports = indexRouter;