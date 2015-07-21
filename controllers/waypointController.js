var url = require('url');

var Waypoint = require('../db/models/waypoint.js');
var Waypoints = require('../db/collections/waypoints');

module.exports = {

  getWaypoints: function(req, res) {
    new Waypoint()
      .query({where: {quest_id: req.params.questId}})
      .fetch()
      .then(function(waypoints) {
      if (!waypoints) {
        res.status(404).send('Waypoints not found');
      } else {
        res.status(200).send(waypoints);
      }
    });
  },

  makeWaypoint: function(req, res) {
    var newWaypoint = new Waypoint({
      quest_id: req.params.questId,
      index_in_quest: req.body.indexInQuest,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      title: req.body.title,
      description: req.body.description,
    });
    newWaypoint.save().then(function(waypoint) {
      if (!waypoint) {
        res.status(500).send('Internal server error')
      } else {
        res.status(201).send(waypoint);
      }
    });
  },

  updateWaypoint: function(req, res) {
    new Waypoint({
      id: req.params.waypointId
    }).fetch().then(function(waypoint) {
      if (!waypoint) {
        res.status(404).send('Waypoint not found');
      } else {
        for (var key in req.body) {
          waypoint.set(key, req.body[key]);
        }
        waypoint.save().then(function(waypoint) {
          if (!waypoint) {
            res.status(500).send('Internal server error');
          } else {
            res.status(201).send(waypoint);
          }
        });
      }
    });
  },

  deleteWaypoint: function(req, res) {
    new Waypoint({
      id: req.params.waypointId
    }).fetch().then(function(waypoint) {
      if (!waypoint) {
        res.status(404).send('Waypoint not found');
      } else {
        waypoint.destroy().then(function(success) {
          if (!success) {
            res.status(500).send('Internal server error');
          } else {
            res.status(204).send();
          }
        });
      }
    });
  },

};
