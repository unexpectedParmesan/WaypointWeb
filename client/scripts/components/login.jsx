var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Content = require('./content.jsx');

var Login = React.createClass({
  mixins: [Reflux.connect(User, 'viewInfo')],

  getInitialState: function(){
    return {
      viewInfo: {
        buttonText: 'Log In',
        isLoggedIn: false,
      },
      user: {
        accessToken: localStorage.getItem('user_access_token'),
        accessTokenExpires: localStorage.getItem('user_access_token_expires'),
        fbUserID: localStorage.getItem('fb_user_id'),
        userStatus: localStorage.getItem('user_status')
      }
    };
  },

  componentWillMount: function(){
    console.log('componentWillMount, cookie: ', document.cookie);
  },

  handleClick: function(){
    console.log(this.state.viewInfo.isLoggedIn, localStorage.getItem('user_status'));
    console.log(!this.state.viewInfo.isLoggedIn && localStorage.getItem('status') === 'connected')
    if (!this.state.viewInfo.isLoggedIn && localStorage.getItem('user_status') === 'connected'){
      console.log('log user in')
      Actions.login();
    } else if (!this.state.viewInfo.isLoggedIn && localStorage.getItem('user_status') === 'not_authorized'){
      console.log('authenticate user')
      Actions.authenticate();
    } else if (!this.state.viewInfo.isLoggedIn && localStorage.getItem('user_status') === 'unknown') {
      console.log('authenticate user')
      Actions.authenticate();
    } else if (this.state.viewInfo.isLoggedIn) {
      console.log('log user out')
      Actions.logout();
    }

  },

  render: function() {
    return(
      <div>
        <button onClick={this.handleClick}>{this.state.viewInfo.buttonText}</button>
        <Content loggedIn={this.state.viewInfo.loggedIn} />
      </div>
    );
  }
});

module.exports = Login;
