var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');

var Home = React.createClass({

  render: function(){
    return (
      <div>Welcome home!</div>
    );
  },
});

module.exports = Home;