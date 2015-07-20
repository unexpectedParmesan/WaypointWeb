var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Landing = require('./landing');
var Home = require('./home');

var Content = React.createClass({

  componentWillMount: function(){
    console.log('in Content', this.props);
  },

  render: function(){
    console.log("rendering Content. this.props.loggedIn: ", this.props.loggedIn);
    if (this.props.loggedIn){
      return <Home />;
    } else {
      return <Landing />;
    }
  },
});

module.exports = Content;