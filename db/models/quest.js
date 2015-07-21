var db = require('../config.js');
var Waypoint = require('./waypoint.js');

var Quest = db.Model.extend({
	tableName: 'quests',
	waypoints: function() {
		return this.hasMany(Waypoint);
	},
	hasTimestamps: true
});

module.exports = Quest;
