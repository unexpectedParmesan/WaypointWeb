var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: [Actions],

  init: function() {
    this.userId = null;
    this.buttonText = 'Log in';
  },

  getDefaultData: function(){
    return {
      userId: this.userId,
      buttonText: this.buttonText,
    }
  },

  checkUser: function(id) {
  },

  onLogin: function(callback){
    var store = this;
    FB.login(function(response){
      console.log(response);
      FB.api('/me', function(response) {
        console.log('Hi, ' + response.name + '.');
      });
      store.userId = response.authResponse.userID;
      store.accessToken = response.authResponse.accessToken;
      store.trigger({
        userId: store.userId, 
        buttonText: 'Log out',
      }); 
      console.log('callback', callback);
      callback();
    }, {scope:'public_profile,email,user_friends'});
  },

  onLogout: function(callback){
    console.log('callback', callback);
    FB.logout(callback);
    this.trigger({
      userId: null, 
      buttonText: 'Log in',
    }); 

  },

});

module.exports = userStore;