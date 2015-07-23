var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var QuestForm = require('../components/questForm.jsx');

var Main = React.createClass({

  render: function() {
    return(
    	<div>
    	  <QuestForm />
      </div>
    );
  }

}

React.render(<Main />, document.getElementById("content"));

module.exports = Main;
