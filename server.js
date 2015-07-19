var express = require('express');
var app = express();
var parser = require('body-parser');
var index = require('./routes/index');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

app.use('/', index);


