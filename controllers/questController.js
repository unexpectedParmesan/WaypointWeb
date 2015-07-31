var Quest = require('../db/models/quest.js');
var Waypoint = require('../db/models/waypoint.js');

module.exports = {

  getAllQuests: function(req, res) {
    new Quest().fetchAll({
      withRelated: 'waypoints'
    }).then(function(questWithWaypoints) {
      res.status(200).send(questWithWaypoints);
    });
  },

  getOneQuest: function(req, res) {
    new Quest().query({ where: {id: req.params.questId}})
    .fetch({
      withRelated: 'waypoints'
    }).then(function(questWithWaypoints){
      if (!questWithWaypoints){
        res.status(404).send('Quest not found');
      } else {
      res.status(200).send(questWithWaypoints);
      }
    });
  },

  makeQuest: function(req, res) {
  	var newQuest = new Quest({
      title: req.body.title,
      description: req.body.description,
      estimated_time: req.body.estimatedTime,
      creator_facebook_id: req.body.facebookId,
  	});
  	newQuest.save().then(function(quest){
      // all quests come with a waypoint free of charge
      var newWaypoint = new Waypoint({
        quest_id: quest.id,
        index_in_quest: 0,
        latitude: 37.7852134705,
        longitude: -122.4028015137,
        title: 'Untitled Waypoint',
        description: 'Add a description here!',
      });
      newWaypoint.save().then(function(waypoint) {
        new Quest({ id: waypoint.attributes.quest_id })
        .fetch({ withRelated: 'waypoints' })
        .then(function(questWithWaypoints) {
  		    res.status(200).send(questWithWaypoints);
        });
      });
  	});
  },

  updateQuest: function(req, res) {
    new Quest({
      id: req.params.questId
    }).fetch().then(function(quest) {
      if (!quest) {
        res.status(404).send('Quest not found');
      } else {
        for (var key in req.body) {
          quest.set(key, req.body[key]);
        }
        quest.save().then(function(quest) {
          console.log('==========> saved quest', quest);
          if (!quest) {
            res.status(500).send('Internal server error');
          } else {
            new Quest({
              id: quest.id
            }).fetch({
              withRelated: 'waypoints'
            }).then(function(questWithWaypoints) {
             res.status(201).send(questWithWaypoints);
           });
          }
        });
      }
    });
  },

  deleteQuest: function(req, res) {
    new Quest({
      id: req.params.questId
    }).fetch().then(function(quest) {
      if (!quest) {
        res.status(404).send('Quest not found');
      } else {
        quest.destroy().then(function(success) {
          if (!success) {
            res.status(500).send('Internal server error');
          } else {
            res.status(204).send();
          }
        });
      }
    });
  }
};
