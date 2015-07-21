var db = require('../config.js');
var UserActiveQuest = require('../models/UserActiveQuest.js');

var UserActiveQuests = new db.Collection();

UserActiveQuests.model = UserActiveQuest;

module.exports = UserActiveQuests;