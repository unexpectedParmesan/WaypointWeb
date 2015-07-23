var express             = require('express');
var app                 = express();
var questController     = require('../controllers/questController.js');
var waypointController  = require('../controllers/waypointController.js');
var questsRouter        = express.Router();

questsRouter.get('/', function(req, res) {
  questController.getAllQuests(req, res);
});

questsRouter.get('/:questId', function(req, res) {
  questController.getOneQuest(req, res);
});

questsRouter.post('/', function(req, res) {
  questController.makeQuest(req, res);
});

questsRouter.put('/:questId', function(req, res) {
  questController.updateQuest(req, res);
});

questsRouter.delete('/:questId', function(req, res) {
  questController.deleteQuest(req, res);
});

questsRouter.get('/:questId/waypoints', function(req, res) {
  waypointController.getWaypoints(req, res);
});

questsRouter.post('/:questId/waypoints', function(req, res) {
  waypointController.makeWaypoint(req, res);
});

questsRouter.put('/:questId/waypoints/:waypointId', function(req, res) {
  waypointController.updateWaypoint(req, res);
});

questsRouter.delete('/:questId/waypoints/:waypointId', function(req, res) {
  waypointController.deleteWaypoint(req, res);
});

module.exports = questsRouter;