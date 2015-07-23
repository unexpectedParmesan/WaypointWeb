var $ = require('jquery');

var API = {
  // getMe()
  getMe: function () {

    return $.ajax({
      url: 'http://localhost:3000/users/me',
      method: 'GET',
    })
      .done(function () {
        console.log('SUCCESS: ');
        console.log(response);
        console.log(status);

        return {
          status: status, 
          data: response
        };

      })
      .fail(function () {
        console.log('ERROR: ');
        console.log(status, errorMessage);
        result.status = status;
        return {
          status: status, 
          message: errorMessage
        };
      });
  }, // end of getMe()
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

module.exports = API;