'use strict';

var $ = require('jquery');


var api = {
  
  // getMe()
  getMe: function () {

    return $.ajax({
             url: 'http://localhost:3000/users/me'
           })
            .done(function(res) {
              // console.log(res);
              return res;
            })
            .fail(function(res) {
              // console.log(res);
              return res;
            });

  }, // end of getMe()

  getQuests: function(userId) {

    var url;
    if (userId) {
      url = 'http://localhost:3000/users/' + userId + '/createdQuests';
    } else {
      url = 'http://localhost:3000/quests';
    }

    return $.ajax({
      url: url
    })
    .done(function(res) {
      return res;
    })
    .fail(function(res) {
      return res;
    });
  },

  // getQuests(userID) - optionally takes a user_id and returns all quests for that user, otherwise returns all quests
  // getQuest(questID) - returns quest with specified id
  // getWaypointsForQuest(questID) - returns waypoints for given quest id
  // saveQuest(questObj, action) - saves a quest to database, actions should be POST/PUT
  // saveWaypoint(waypointObj, action) - saves a waypoint to database, actions should be POST/PUT
  // deleteQuest(questID) - deletes a quest from database
  // deleteWaypoint(waypointID) - deletes a waypoint from database
  // goHome() - brings the user to /home
  // logout() - logs out the user
};

module.exports = api;
