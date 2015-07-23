var express        = require('express');
var app            = express();
var userController = require('../controllers/userController.js');
var usersRouter    = express.Router();

usersRouter.get('/', function(req, res) {
  userController.getAllUsers(req, res);
});

usersRouter.get('/me', function(req, res) {
  if (!req.session.passport.user) {
    res.redirect('/login');
  } else {
    var user = JSON.stringify(req.session.passport.user);
    res.status(200).send(user);
  }  
});

usersRouter.get('/:facebookId/createdQuests', function(req, res) {
  userController.getCreatedQuests(req, res);
});

usersRouter.get('/:facebookId', function(req, res) {
  userController.getUser(req, res);
});

usersRouter.post('/:facebookId', function(req, res) {
  userController.makeUser(req, res);
});

usersRouter.get('/:facebookId/activeQuests', function(req, res) {
  userController.getActiveQuests(req, res);
});

usersRouter.post('/:facebookId/activeQuests/:questId', function(req, res) {
  userController.findCreateActiveQuest(req, res);
});

usersRouter.put('/:facebookId/activeQuests/:questId', function(req, res) {
  userController.updateActiveQuest(req, res);
});

usersRouter.delete('/:facebookId/activeQuests/:questId', function(req, res) {
  userController.deleteActiveQuest(req, res);
});

module.exports = usersRouter;