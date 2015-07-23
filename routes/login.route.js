var express     = require('express');
var path        = require('path');
var app         = express();
var loginRouter = express.Router();

loginRouter.get('/', function (req, res) {
  res.location('/login');
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});

module.exports = loginRouter;