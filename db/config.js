var ENV = require ('../environment');

if (ENV === 'production') {
	var knex = require('knex')({
		client: 'mysql',
		connection: {
			host: 'us-cdbr-iron-east-02.cleardb.net',
			user: 'bbaf82d9c58cfe',
			password: 'ccebbb53',
			database: 'heroku_b2cce461cdb238b',
			charset: 'utf8'
		}
	});
} else {
	var knex = require('knex')({
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'waypointdb',
			charset: 'utf8'
		}
	});
}

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('quests').then(function(exists) {
	if (!exists) {
		db.knex.schema.createTable('quests', function(quest) {
			quest.increments('id').primary();
			quest.string('creator_facebook_id', 100);
			quest.string('title', 100);
			quest.string('length', 100);
			quest.string('description', 5000);
			quest.string('estimated_time', 100);
			quest.timestamps();
		}).then(function(table) {
			console.log('Created table', table);
		});
	}
});

db.knex.schema.hasTable('waypoints').then(function(exists) {
	if (!exists) {
		db.knex.schema.createTable('waypoints', function(waypoint) {
			waypoint.increments('id').primary();
			waypoint.integer('quest_id');
			waypoint.integer('index_in_quest');
			waypoint.float('latitude', 15,10);
			waypoint.float('longitude', 15,10);
			waypoint.string('title', 100);
			waypoint.string('description', 5000);
			waypoint.timestamps();
		}).then(function(table) {
			console.log('Created table', table);
		});
	}
});

db.knex.schema.hasTable('users').then(function(exists) {
	if (!exists) {
		db.knex.schema.createTable('users', function(user) {
			user.increments('id').primary();
			user.string('facebook_id', 40);
			user.string('name', 60);
			user.string('profile_pic', 500);
			user.timestamps();
		}).then(function(user) {
			console.log('Created table', user);
		});
	}
});

db.knex.schema.hasTable('user_active_quests').then(function(exists) {
	if (!exists) {
		db.knex.schema.createTable('user_active_quests', function(user_active_quest) {
			user_active_quest.increments('id').primary();
			user_active_quest.integer('quest_id');
			user_active_quest.string('facebook_id');
			user_active_quest.integer('current_waypoint_index', 10);
			user_active_quest.timestamps();
		}).then(function(table) {
			console.log('Created table', table);
		});
	}
});

module.exports = db;
