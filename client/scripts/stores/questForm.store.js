var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var $ = require('jquery');

var questFormStore = Reflux.createStore({
  listenables: [Actions],

  onGetUserData: function(){
  	console.log("All up in getUserData function");
  	$.get('http://127.0.0.1:3000/users/me', function(result){
  		console.log('Here be result:', result);

  	});
  },

  getDefaultData: function(){
  	this.user = 'testUser';
  	return this.user;
  }

});

module.exports = questFormStore;