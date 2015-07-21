var url = require('url');
var Quest = require('../db/models/quest.js');
var User = require('../db/models/user.js');
var userActiveQuest = require('../db/models/userActiveQuest.js');

module.exports = {

 getAllUsers: function(req, res){
  new User().fetchAll({
  }).then(function(users){
    res.status(200).send(users);
  });
},

 getUser: function(req, res){
  new User({
    facebook_id: req.params.facebookId
    }).fetch().then(function(user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send('User not found');
      }
    });
 },

 makeUser: function(req, res) {
    var newUser = new User({
      facebook_id: req.params.facebookId,
      name: req.body.name,
      profile_pic: req.body.profilePic
    });
    newUser.save().then(function(user) {
      res.status(200).send(user);
    });
 },

 getCreatedQuests: function(req, res){
   new Quest().query({where: {creator_facebook_id: req.params.facebookId}})
    .fetch({
      withRelated: 'waypoints'
    }).then(function(quests){
    if (!quests){
      res.status(404).send('No created quests found');
    } else {
      res.status(200).send(quests);
    }
   });
 },

  getActiveQuests: function(req, res){
    new userActiveQuest({
      facebook_id: req.params.facebookId
      }).fetchAll().then(function(usersActiveQuests) {
        var responseArray = [];
        usersActiveQuests.models.forEach(function(activeQuest) {
          new Quest({
            id: activeQuest.attributes.quest_id
          }).fetch({
            withRelated: 'waypoints'
          }).then(function(questWithWaypoints) {
            if (questWithWaypoints) {
              var waypoints = [];
              questWithWaypoints.relations.waypoints.models.forEach(function(waypoint) {
                waypoints.push(waypoint.attributes);
              });
              questWithWaypoints = questWithWaypoints.attributes;
              questWithWaypoints.waypoints = waypoints;
              responseArray.push(questWithWaypoints);
            }
          });
        });

        setTimeout(function() {
          res.status(200).send(responseArray);
        }, 100);
      });
  },

  updateActiveQuest: function(req, res){
    new userActiveQuest({
      facebook_id: req.params.facebookId,
      quest_id: req.params.questId
    }).fetch().then(function(userActiveQuest){
      if (!userActiveQuest){
        res.status(404).send('Quest not found');
      } else {
        for (var key in req.body) {
          userActiveQuest.set(key, req.body[key]);
        }
      }
      userActiveQuest.save().then(function(userActiveQuest){
        res.status(200).send(userActiveQuest);
      });
    });
  },

  deleteActiveQuest: function(req, res){
    new userActiveQuest({
      facebook_id: req.params.facebookId,
      quest_id: req.params.questId
    }).fetch().then(function(activeQuest) {
      if (!activeQuest) {
        res.status(404).send('Active quest not found');
      } else {
        activeQuest.destroy().then(function(success) {
          if (!success) {
            res.status(500).send('Internal server error');
          } else {
            res.status(204).send();
          }
        })
      }
    });
  },

  findCreateActiveQuest: function(req, res){
    new userActiveQuest({
      facebook_id: req.params.facebookId,
      quest_id: req.params.questId
    }).fetch().then(function(userActiveQuest){
      if (!userActiveQuest){
        res.status(404).send('Active quest not found');
      } else {
        var newActiveQuest = new userActiveQuest({
          facebook_id: req.params.facebookId,
          quest_id: req.params.questId,
          current_waypoint_index: 0
        });
        newActiveQuest.save().then(function(newActiveQuest){
          res.status(201).send(newActiveQuest);
        });
      }
    });
  }

};
