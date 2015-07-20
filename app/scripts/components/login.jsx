var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Content = require('./content');

var Login = React.createClass({
  mixins: [Reflux.connect(User)],

  setInitialState: function(){
    return {
      loggedIn: false,
      buttonText: "Log in",
      userId: null,
    };
  },

  componentWillMount: function(){
    
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '943850322345964',
        status     : true,  
        xfbml      : true, 
        version    : 'v2.3'
      });
      // get login status of user
      FB.getLoginStatus(function(response) {
        
        if (response.status === 'connected') { // logged into facebook and app

          this.setState({
            loggedIn: true,
            buttonText: "Log out",
            userId: response.authResponse.userID,
          });

        } else { 
          this.setState({
            loggedIn: false,
            buttonText: "Log in",
            userId: null,
          });
        } 
      }.bind(this)); // bind this react component to getLoginStatus()
    }.bind(this); // bind this react component to fbAsyncInit()

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(window.document, 'script', 'facebook-jssdk'));
  },

  handleClick: function(){
    if (this.state.loggedIn) {
      Actions.logout();
    } else {
      Actions.login();
    }
  },

  render: function() {
    return(
      <div>
        <button onClick={this.handleClick}>{this.state.buttonText}</button>
        <Content loggedIn={this.state.loggedIn} />
      </div>
    );
  }
});

module.exports = Login;
