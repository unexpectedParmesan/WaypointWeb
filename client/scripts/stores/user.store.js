var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: [Actions],

  getDefaultData: function(){
    return {
      buttonText: 'Log in',
      loggedIn: false,
    };
  },

  createUser: function(id){

  },

  checkUser: function(id) {
    var store = this;

    // $.ajax({
    //   url: 'https://waypointserver.herokuapp.com/users/' + id,
    //   dataType: 'jsonp',
    //   success: function(response){
    //     console.log('success, ' + response);
    //   },
    //   error: function(response){
    //     if (response.status === 404) { // user not found
    //       store.createUser(id);
    //     }
    //   },
    // });
  },

  onAuthenticate: function(){
    var store = this;
    FB.login(function(response){
      FB.api('/me', function(response) {
        console.log('Hi, ' + response.name + '.');
        console.log(response);
      });
      store.userId = response.authResponse.userID;
      store.accessToken = response.authResponse.accessToken;
      store.user = {

      }
      store.onLogin(response.authResponse.userID);
    }, {scope:'public_profile,email,user_friends'});
  },

  onLogin: function(fbId){
    var cookie = document.cookie;

    // path
    // domain
    // max-age
    // expires
    // facebookID

    cookie = 'path=/';
    cookie += 'domain=0.0.0.0:8000';
    cookie += 'max-age=31536000';
    cookie += 'expires=31536000';
    cookie += 'user=' + fbId;

    console.log(cookie);

    this.checkUser(fbId);

    this.trigger({
      buttonText: 'Log out',
      loggedIn: true,
    }); 
  },

  onLogout: function(fbId){
    console.log('in onLogout', fbId);
    this.trigger({
      buttonText: 'Log in',
      loggedIn: false,
    }); 

  },

});

module.exports = userStore;