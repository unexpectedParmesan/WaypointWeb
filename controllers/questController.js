var url = require('url');
var Quest = require('../db/models/quest.js');
var Quests = require('../db/collections/quests.js');

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
    new Quest({
      title: req.body.title
    }).fetch().then(function(found) {
      if (found) {
        res.status(422).send('Sorry, there\'s already a quest with that title!');
      } else {
      	var newQuest = new Quest({
          title: req.body.title,
          length: req.body.length,
          description: req.body.description,
          estimated_time: req.body.estimated_time,
          creator_facebook_id: req.params.facebookId
      	});
      	newQuest.save().then(function(quest){
      		res.status(200).send(quest);
      	});
      }
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
          if (!quest) {
            res.status(500).send('Internal server error');
          } else {
            res.status(201).send(quest);
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
