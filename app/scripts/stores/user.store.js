var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: [Actions],

  checkUser: function(id) {
  },

  onLogin: function(){
    var store = this;
    FB.login(function(response){
      FB.api('/me', function(response) {
        console.log('Hi, ' + response.name + '.');
      });
      store.accessToken = response.authResponse.accessToken;
      store.trigger({
        userId: response.authResponse.userID, 
        buttonText: 'Log out',
        loggedIn: true,
      }); 
    }, {scope:'public_profile,email,user_friends'});
  },

  onLogout: function(){

    this.trigger({
      userId: null, 
      buttonText: 'Log in',
      loggedIn: false,
    }); 

  },

});

module.exports = userStore;