'use strict';

var React = require('react');
// var Reflux = require('reflux');
// var Actions = require('../actions/actions');
// var User = require('../stores/user.store');
var QuestForm = require('../components/questForm.jsx');
var QuestListItem = require('./questListItem.jsx');
var Nav = require('./navbar.jsx');
var api = require('../helpers/api.helper');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      quests: [],
    };
  }

  componentDidMount() {
    api.getMe().then(function(user) {
      this.setState({ user: JSON.parse(user) });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <Nav user={this.state.user} />
        <QuestListItem quest={this.state.quests}/>
    	  <QuestForm />
      </div>
    );
  }

}


// React.render(<Main />, document.getElementById("content"));

module.exports = Main;
