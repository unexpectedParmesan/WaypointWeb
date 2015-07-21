var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Landing = require('./landing.jsx');
var Home = require('./home.jsx');

var Content = React.createClass({

  render: function(){
    if (this.props.loggedIn){
      return <Home />;
    } else {
      return <Landing />;
    }
  },
});

module.exports = Content;