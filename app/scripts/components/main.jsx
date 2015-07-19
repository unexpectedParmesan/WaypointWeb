var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');

var Main = React.createClass({
  mixins: [Reflux.connect(User,"userId")],

  getInitialState: function() {
    return User.getDefaultData();
  },

  componentDidMount: function(){
    
    window.fbAsyncInit = function() {
      console.log('in fbAsyncInit');
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
          // TODO: build render JSX
          this.setState({
            page: <div><p>You are home!</p>{this.state.userId}</div>
          }); 

        } else if (response.status === 'not_authorized') { // logged into facebook, but hasn't authorized waypoint
          console.log('logged in, but has not authorized waypoint');

          // TODO
          this.setState({
            page: <div>
              <button onClick={this.handleClick}>Log in with Facebook</button>{this.state.userId}
              </div>
          });

        } else { // not logged into facebook
          console.log('not logged in');
          // TODO
          this.setState({
            page: <div><button onClick={this.handleClick}>Log in with Facebook</button></div>
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
     console.log('loading async')
   }(window.document, 'script', 'facebook-jssdk'));
  },

  handleClick: function(){
    var context = this;
    FB.login(function(response){
      console.log('Response from FB.login: ', response);
      Actions.login(response.authResponse.userID);
      console.log(context.state);
      context.setState({
        page: <div><p>You are home!</p>{context.state.userId}</div>
      }); 
    });
  },

  render: function() {

    return (
      <div>
       {this.state.page}
      </div>

    )
  }
});

module.exports = Main;
