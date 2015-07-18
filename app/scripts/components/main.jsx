var React = require('react');
var Landing = require('./landing');
var Dashboard = require('./dashboard');
var FB = require('react-facebook-login');


var Main = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
    };
  },

  componentWillMount: function() {
    console.log('in componentWillMount')
    console.log(FB)
    // FB.getLoginStatus(function(response){
    //   if (response === 'connected') { // logged in
    //     console.log('logged in')
    //   } else if (response === 'not_authorized') { // have not authorized waypoint app
    //     console.log('has not authorized waypoint')
    //   } else { // not logged in
    //     console.log('not logged in')
    //   }
    // })
  },

  render: function() {

    if (this.state.loggedIn) {
      return (
        <div>
          <Dashboard />
        </div>
      );
    } else {
      return (
        <div>
          <FB
            appId="1689808731249333"
            class="facebook-login"
            scope="public_profile, email, user_birthday"
            loginHandler={ resultFacebookLogin } />
        </div>
      );
    }
  }
});

module.exports = Main;
