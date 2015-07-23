'use strict';

var $ = require('jquery');

var API = {
    // getMe()
    getMe: function () {

      return $.ajax({
        url: 'http://localhost:3000/users/me'
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });

    }, // end of getMe()
    // getQuests(userId) - optionally takes a user_id and returns all quests for that user, otherwise returns all quests
    getQuests: function (userId) {

      var url = userId ? 'http://localhost:3000/users/' + userId + '/createdQuests' : 'http://localhost:3000/quests';
      console.log(url);
      return $.ajax({
        url: url
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });
    },
    // getQuest(questID) - returns quest with specified id
    getQuest: function (questId) {
      if (!questId) { throw new Error("Must provide questId as an argument to getQuest()"); }
      
      return $.ajax({
        url: 'http://localhost:3000/quests/' + questId
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });
    }, // end of getQuest()
    // getWaypointsForQuest(questId) - returns waypoints for given quest id
    getWaypoints: function (questId) {
      if (!questId) { throw new Error("Must provide questId as an argument to getWaypoints()"); }
      
      return $.ajax({
        url: 'http://localhost:3000/quests/' + questId + '/waypoints'
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });
    },
    // saveQuest(questObj, action) - saves a quest to database, actions should be POST/PUT
    saveQuest: function(questObj, action) {},
    // saveWaypoint(waypointObj, action) - saves a waypoint to database, actions should be POST/PUT
    saveWaypoint: function (waypointObj, action) {},
    // deleteQuest(questId) - deletes a quest from database
    deleteQuest: function (questId) {},
    // deleteWaypoint(waypointId) - deletes a waypoint from database
    deleteWaypoint: function (waypointId) {},
    // goHome() - brings the user to /home
    goHome: function () {},
    // logout() - logs out the user
    logout: function () {},
  };

module.exports = API;