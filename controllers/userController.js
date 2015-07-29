var url = require('url');
var Quest = require('../db/models/quest.js');
// var Waypoint = require('../db/models/waypoint.js');
var User = require('../db/models/user.js');
var userActiveQuest = require('../db/models/userActiveQuest.js');

module.exports = {

  getMe: function (req, res) {
    new User({
      facebook_id: req.session.passport.user.facebook_id
    }).fetch().then(function (user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send('User not found');
      }
    });
  },

  getAllUsers: function (req, res) {
    new User().fetchAll({}).then(function (users) {
      res.status(200).send(users);
    });
  },

  getUser: function (req, res) {
    new User({
      facebook_id: req.params.facebookId
    }).fetch().then(function (user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send('User not found');
      }
    });
  },

  // NOT CURRENTLY IN USE. SEE auth.router.js
  // create a user and give them a template quest with one waypoint

  // makeUser: function (req, res) {
  //   console.log('########### MAKE USER');
  //   var newUser = new User({
  //     facebook_id: req.params.facebookId,
  //     name: req.body.name,
  //     profile_pic: req.body.profilePic
  //   });
  //   newUser.save().then(function (user) {
  //     var newQuest = new Quest({
  //       creator_facebook_id: user.attributes.facebook_id,
  //       title: 'Untitled Quest',
  //       description: 'Add a description here!',
  //       length: '2.3 mi',
  //       estimated_time: '2-3 hrs',
  //     });
  //     newQuest.save().then(function(quest) {
  //       console.log('############# TEMPLATE QUEST:', quest);
  //       var newWaypoint = new Waypoint({
  //         quest_id: quest.attributes.id,
  //         index_in_quest: 0,
  //         latitude: 37.7852134705,
  //         longitude: -122.4028015137,
  //         title: 'Untitled Waypoint',
  //         description: 'Add a description here!',
  //       });
  //       newWaypoint.save().then(function(waypoint) {
  //         console.log('############# TEMPLATE WAYPOINT:', waypoint);
  //         res.status(200).send(user);
  //       });
  //     });
  //   });
  // },

  getCreatedQuests: function (req, res) {
    new Quest().query({
      where: {
        creator_facebook_id: req.params.facebookId
      }
    }).fetchAll({
        withRelated: 'waypoints'
    }).then(function (quests) {
      if (!quests) {
        res.status(404).send('No created quests found');
      } else {
        res.status(200).send(quests);
      }
    });
  },
  getActiveQuests: function (req, res) {
    new userActiveQuest().query({
      where: {
        facebook_id: req.params.facebookId
      }
    }).fetchAll().then(function (userActiveQuests) {
      var responseArray = [];
      userActiveQuests.models.forEach(function (activeQuest) {
        var currentWaypointIndex = activeQuest.attributes.current_waypoint_index;
        new Quest({
          id: activeQuest.attributes.quest_id
        }).fetch({
          withRelated: 'waypoints'
        }).then(function (questWithWaypoints) {
          if (questWithWaypoints) {
            var waypoints = [];
            questWithWaypoints.relations.waypoints.models.forEach(function (waypoint) {
              waypoints.push(waypoint.attributes);
            });
            questWithWaypoints = questWithWaypoints.attributes;
            questWithWaypoints.waypoints = waypoints;
            questWithWaypoints.current_waypoint_index = currentWaypointIndex;
            responseArray.push(questWithWaypoints);
          }
        });
      });

      setTimeout(function () {
        res.status(200).send(responseArray);
      }, 300);
    });
  },

  updateActiveQuest: function (req, res) {
    new userActiveQuest({
      facebook_id: req.params.facebookId,
      quest_id: req.params.questId
    }).fetch().then(function (userActiveQuest) {
      if (!userActiveQuest) {
        res.status(404).send('Quest not found');
      } else {
        for (var key in req.body) {
          userActiveQuest.set(key, req.body[key]);
        }
      }
      userActiveQuest.save().then(function (userActiveQuest) {
        res.status(200).send(userActiveQuest);
      });
    });
  },

  deleteActiveQuest: function (req, res) {
    new userActiveQuest({
      facebook_id: req.params.facebookId,
      quest_id: req.params.questId
    }).fetch().then(function (activeQuest) {
      if (!activeQuest) {
        res.status(404).send('Active quest not found');
      } else {
        activeQuest.destroy().then(function (success) {
          if (!success) {
            res.status(500).send('Internal server error');
          } else {
            res.status(204).send();
          }
        });
      }
    });
  },

  findCreateActiveQuest: function (req, res) {
    new userActiveQuest({
        facebook_id: req.params.facebookId,
        quest_id: req.params.questId
    }).fetch().then(function (quest) {
        if (!quest) {
            var newActiveQuest = new userActiveQuest({
              facebook_id: req.params.facebookId,
              quest_id: req.params.questId,
              current_waypoint_index: 0
            });
            newActiveQuest.save().then(function (newActiveQuest) {
              res.status(201).send(newActiveQuest);
            });
        } else {
            res.status(404).send(quest);
        }
    });
  }
};
