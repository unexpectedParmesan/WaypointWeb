var db = require('../config.js');
var Quest = require('../models/quest.js');

var Quests = new db.Collection();

Quests.model = Quest;

module.exports = Quests;
