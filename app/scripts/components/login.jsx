var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Content = require('./content');

var Login = React.createClass({
  mixins: [Reflux.connect(User)],

  getInitialState: function(){
    console.log('setInitialState', User.getDefaultData())
    return User.getDefaultData();
  },

  componentWillMount: function(){
    console.log('componentWillMount')
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
            fbLoginStatus: 'connected'
          });
        } else if (response.status === "not_authorized") {
          this.setState({
            fbLoginStatus: 'not_authorized'
          });
        } else {
          this.setState({
            fbLoginStatus: 'unknown'
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
    console.log(this.state.loggedIn, this.state.fbLoginStatus);

    // not logged into FB or Waypoint
    if (!this.state.loggedIn && this.state.fbLoginStatus === 'unknown'){
      Actions.authenticate(); // want to authenticate with FB
    // logged into FB but not Waypoint
    } else if (!this.state.loggedIn && this.state.fbLoginStatus === 'connected'){
      Actions.login(); // want to log you in
    // logged into FB and Waypoint
    } else if (this.state.loggedIn && this.state.fbLoginStatus === 'connected') {
      console.log('a;lskdjf')
      Actions.logout(); // log out user
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
