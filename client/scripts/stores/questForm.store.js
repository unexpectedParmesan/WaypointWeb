var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var api = require('../helpers/api.helper');

var questFormStore = Reflux.createStore({
  listenables: [Actions],

  // onGetUserData: function(){
  // 	console.log("All up in getUserData function");
  // 	$.get('localhost:3000/users/me', function(result){
  // 		console.log('Here be result:', result);
  //
  // 	});
  // },
  //
  // getDefaultData: function(){
  // 	this.user = 'testUser';
  // 	console.log('in getDefaultData');
  //   return {
  //     user: this.user
  //   }
  // }

});

module.exports = questFormStore;
