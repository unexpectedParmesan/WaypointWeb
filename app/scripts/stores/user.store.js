var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: [Actions],

  getDefaultData: function(){
    return {
      userId: null, 
      buttonText: 'Log in',
      loggedIn: false,
    };
  },

  checkUser: function(id) {
  },

  onAuthenticate: function(){
    var store = this;
    FB.login(function(response){
      FB.api('/me', function(response) {
        console.log('Hi, ' + response.name + '.');
      });
      store.userId = response.authResponse.userID;
      store.accessToken = response.authResponse.accessToken;
      console.log('this in onAuthenticate', this);
      store.onLogin();
    }, {scope:'public_profile,email,user_friends'});
  },

  onLogin: function(){
    this.trigger({
      userId: this.userId, 
      buttonText: 'Log out',
      loggedIn: true,
      fbLoginStatus: 'connected',
    }); 
  },

  onLogout: function(){

    this.trigger({
      userId: null, 
      buttonText: 'Log in',
      loggedIn: false,
      fbStatus: 'unknown',
    }); 

  },

});

module.exports = userStore;