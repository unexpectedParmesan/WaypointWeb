//Populates the database with dummy data: 2 quests with 3 waypoints each
//Quest_ids are 2 and 12 because clearDB is wacky, they start at 2 and increment by 10

var db = require('./config.js');
var Quest = require('./models/quest.js');
var Waypoint = require('./models/waypoint.js');
var User = require('./models/user.js');
var userActiveQuest = require('./models/userActiveQuest');

var quest1 = new Quest({
	title: 'Zombie Escape 2: mySQL',
	length: '2.3 mi',
	description: 'A thrilling brush with the undead through some the city\'s lovliest parks. Includes puzzles and physical clues. Requires tree climbing. Recomended start time is 6pm.',
	estimated_time: '2-3 hrs',
	creator_facebook_id: 'facebook1'
});

var waypoint1 = new Waypoint({
	quest_id: 2,
	index_in_quest: 0,
	latitude: 37.785214,
	longitude: -122.402802,
	title: 'zomg waypoint',
	description: 'see this here. this here\'s a waypoint.',
});

var waypoint2 = new Waypoint({
	quest_id: 2,
	index_in_quest: 1,
	latitude: 37.776090,
	longitude: -122.434645,
	title: 'also waypoint',
	description: 'way on point',
});

var waypoint3 = new Waypoint({
	quest_id: 2,
	index_in_quest: 2,
	latitude: 37.772772,
	longitude: -122.458690,
	title: 'also also waypoint',
	description: 'porkchop sandwhiches!',
});

var quest2 = new Quest({
	title: 'Hack Reactor Bars',
	length: '0.7 mi',
	description: 'we deserve a beer or seven',
	estimated_time: '1-13 hrs',
	creator_facebook_id: 'facebook1'
});

var waypoint4 = new Waypoint({
	quest_id: 12,
	index_in_quest: 0,
	latitude: 37.783932,
	longitude: -122.409084,
	title: 'mikeller',
	description: 'so classy!',
});

var waypoint5 = new Waypoint({
	quest_id: 12,
	index_in_quest: 1,
	latitude: 37.781169,
	longitude: -122.406297,
	title: 'tempest',
	description: 'less classy...',
});

var waypoint6 = new Waypoint({
	quest_id: 12,
	index_in_quest: 2,
	latitude: 37.782879,
	longitude: -122.410106,
	title: 'crazy horse',
	description: '...',
});

var user1 = new User({
	facebook_id: 'facebook1',
	name: 'bo diddley',
	profile_pic: 'fake url'
});

var activeQuest1 = new userActiveQuest({
	quest_id: 2,
	facebook_id: 'facebook1',
	current_waypoint_index: 1
});

var quest3 = new Quest({
	title: 'A unique affair',
	length: 'A while',
	description: 'Stuff and things',
	creator_facebook_id: 'facebook1'
});

var activeQuest2 = new userActiveQuest({
	quest_id: 32,
  facebook_id: 'facebook1',
  current_waypoint_index: 0
});



quest1.save().then(function(quest) {
	console.log('saved quest:', quest);
});

quest3.save().then(function(quest){
	console.log('saved quest:', quest);
});

activeQuest2.save().then(function(quest){
	console.log('saved quest:', quest);
});

waypoint1.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint2.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint3.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

quest2.save().then(function(quest) {
	console.log('saved quest:', quest);
});

waypoint4.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint5.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

waypoint6.save().then(function(waypoint) {
	console.log('saved waypoint:', waypoint)
});

user1.save().then(function(user) {
	console.log('saved quest:', user);
});

activeQuest1.save().then(function(activeQuest) {
	console.log('saved quest:', activeQuest);
});
