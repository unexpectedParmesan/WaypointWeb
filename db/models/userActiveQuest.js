var db = require('../config.js');
var Quest = require('./quest.js');
var User = require('./user.js');
var Waypoint = require('./waypoint.js')


var UserActiveQuest = db.Model.extend({
	tableName: 'user_active_quests',
	user: function(){
		return this.belongsTo(User);
	},
	quest: function(){
		return this.belongsTo(Quest);
	},
	waypoint: function() {
		return this.hasMany(Waypoint);
	},
	hasTimestamps: true
});

module.exports = UserActiveQuest;
