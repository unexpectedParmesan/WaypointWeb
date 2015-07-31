/*
** API Library
** Interface for client to interact with server
*/

'use strict';

var $ = require('jquery');
var baseURL = require('../../../environment');

var API = {

    /*
    ** Method: getMe
    **
    ** Description: Returns the current user logged into Waypoint
    **
    ** Example: var thisUser = getMe();
    **          console.log(thisUser);
    **          // {
    **          //  created_at: timestamp,
    **          //  facebook_id: "10155846614830646",
    **          //  id: 4name: "Danielle Knudson",
    **          //  profile_pic: "url",
    **          //  updated_at: timestamp,
    **          // }
    */
    getMe: function () {
      return $.ajax({
        url: baseURL + '/users/me'
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });

    },

    /*
    ** Method: getQuests
    **
    ** Description: Returns all quests created by user. Returns all quests created in app if no userId is provided.
    */
    getQuests: function (userId) {

      var url = userId ? baseURL + '/users/' + userId + '/createdQuests' : baseURL + '/quests';

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

    /*
    ** Method: getQuest
    **
    ** Description: Returns quest object for the questId supplied.
    */
    getQuest: function (questId) {
      if (!questId) { throw new Error("Must provide questId as an argument to getQuest()"); }

      return $.ajax({
        url: baseURL + '/quests/' + questId
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });
    },

    /*
    ** Method: getWaypoints
    **
    ** Description: Returns all quest waypoints for the supplied questId
    */
    getWaypoints: function (questId) {
      if (!questId) { throw new Error("Must provide questId as an argument to getWaypoints()"); }

      return $.ajax({
        url: baseURL + '/quests/' + questId + '/waypoints'
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });
    },

    /*
    ** Method: saveQuest
    **
    ** Description: Creates or updates a quest. Requires the full quest object and the corresponding http method POST or PUT.
    ** Example:
    ** questObj = {
    **   title: "Quest Title",
    **   description: "Quest description goes something like this",
    **   estimatedTime: "4 hours",
    **   facebookId: "123456789",
    ** };
    ** saveQuest()
    */
    saveQuest: function(questObj, httpMethod) {

      if (!questObj || !httpMethod) {
        throw new Error('Missing argument(s) to saveQuest(). Provide quest object and http method POST or PUT');
      } else if (!(httpMethod === 'POST' || httpMethod === 'PUT')) {
        throw new Error('Provided httpMethod must be POST or PUT');
      }

      console.log(questObj);

      var url = baseURL + '/quests/';
      if (httpMethod === 'PUT') {
        url += questObj.id;
      }


      return $.ajax({
        url: url,
        method: httpMethod,
        data: JSON.stringify(questObj),
        dataType: 'json',
        contentType: 'application/json'
      })
        .done(function (res) {
          return res;
        })
        .fail(function (res) {
          return res;
        });
    },

    /*
    ** Method: saveWaypoint
    **
    ** Description: Creates or updates a waypoint for a given quest. Requires the full waypoint object and the corresponding http method POST or PUT.
    ** Example:
    ** waypointObj = {
    **   questId: 16,
    **   indexInQuest: 0,
    **   latitude: 124.3423,
    **   longitude: -122.23452,
    **   title: "Waypoint Title",
    **   description: "Some waypoint description that is compelling"
    ** };
    */
    saveWaypoint: function (waypointObj, httpMethod) {
      if (!waypointObj || !httpMethod) {
        throw new Error("Missing argument(s) to saveQuest(). Provide quest object and http method POST or PUT");
      } else if (!(httpMethod === "POST" || httpMethod === "PUT")) {

        throw new Error("Provided httpMethod must be POST or PUT");
      }

      var url = baseURL + '/quests/' + waypointObj.quest_id + '/waypoints/';
      if (httpMethod === 'PUT') {
        url += waypointObj.id;
      }

      console.log("waypoint object: ", waypointObj);
      return $.ajax({
        url: url,
        method: httpMethod,
        data: JSON.stringify(waypointObj),
        dataType: 'json',
        contentType: 'application/json'
      })
        .done(function (res) {
          console.log('saveWaypoint success: ');
          console.log(res);
          return res;
        })
        .fail(function (res) {
          console.log('saveWaypoint fail: ');
          console.log(res);
          return res;
        });
    },

    /*
    ** Method: deleteQuest
    **
    ** Description: Deletes quest from the database
    */
    deleteQuest: function (questId) {
      if (!questId) {
        throw new Error("No questId argument provided. Provide quest id to deleteQuest()");
      }

      return $.ajax({
        url: baseURL + '/quests/' + questId,
        method: 'DELETE'
      })
        .done(function () {
          return true;
        })
        .fail(function () {
          return false;
        });
    },

    /*
    ** Method: deleteWaypoint
    **
    ** Description: Deletes waypoint from given quest in the database
    */
    deleteWaypoint: function (questId, waypointId) {
      if (!waypointId || !questId) {
        throw new Error("Did not provide quest and/or waypoint ids. Provide questId and waypointId to deleteWaypoint()");
      }

      return $.ajax({
        url: baseURL + '/quests/' + questId + '/waypoints/' + waypointId,
        method: 'DELETE'
      })
        .done(function () {
          return true;
        })
        .fail(function () {
          return false;
        });
    },
  };

module.exports = API;
