var db = require('../config.js');
var UserActiveQuest = require('./userActiveQuest.js');

var User = db.Model.extend({
	tableName: 'users',
	activeQuests: function(){
		return this.hasMany(UserActiveQuest);
	},
	hasTimestamps: true
});

module.exports = User;
