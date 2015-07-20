var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');

var Landing = React.createClass({

  render: function(){
    console.log("rendering Home. this.props.loggedIn: ", this.props.loggedIn);
    return (
      <div>You need to log in!</div>
    );
  },
});

module.exports = Landing;