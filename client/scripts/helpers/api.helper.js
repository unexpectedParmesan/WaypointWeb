var $ = require('jquery');

var API = {
  // getMe()
  getMe: function () {

    return $.ajax({
             url: 'http://localhost:3000/users/me'
           })
            .done(function(res){ 
              console.log(res);
              return res;
            })
            .fail(function(res){
              console.log(res);
              return res;
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