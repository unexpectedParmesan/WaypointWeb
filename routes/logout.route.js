var express      = require('express');
var app          = express();
var logoutRouter = express.Router();

logoutRouter.get('/', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = logoutRouter;