var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');

var Main = React.createClass({

  render: function() {
    return(
      <div>
        <Login />
      </div>
    );
  }
});

module.exports = Main;
