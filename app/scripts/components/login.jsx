var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Home = require('./home');

var Login = React.createClass({
  mixins: [Reflux.connect(User)],

  getInitialState: function() {
    return User.getDefaultData();
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
          console.log('logged in');
          Actions.login(response.authResponse.userID); // trigger login action with user's facebook id

        } else if (response.status === 'not_authorized') { // logged into facebook, but hasn't authorized waypoint
          console.log('logged in, but has not authorized waypoint');

        } else { // not logged into facebook
          console.log('not logged in');
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
    if (this.state.userId) {
      Actions.logout((function(){
        this.props.onLoginUpdate('log_out');
      }).bind(this));
    } else {
      Actions.login((function(){
        this.props.onLoginUpdate('log_in');  
      }).bind(this));
    }

  },

  render: function() {
    console.log(this.props.onLoginUpdate);
    return(
      <div>
        <button onClick={this.handleClick}>{this.state.buttonText}</button>
      </div>

    );
  }
});

module.exports = Login;
