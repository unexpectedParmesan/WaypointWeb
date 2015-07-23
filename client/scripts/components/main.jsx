'use strict';

var React = require('react');
// var Reflux = require('reflux');
// var Actions = require('../actions/actions');
// var User = require('../stores/user.store');
var QuestForm = require('./questForm.jsx');
var QuestList = require('./questList.jsx');
var Nav = require('./navbar.jsx');
var api = require('../helpers/api.helper');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        facebook_id: null
      },
      quests: [],
    };
  }

  componentDidMount() {
    api.getMe().then(function(user) {
      this.setState({ user: JSON.parse(user) });
    }.bind(this));
  }

  render() {
    var questList;
    if (this.state.user.facebook_id) {
      questList = <QuestList userId={this.state.user.facebook_id} />;
    } else {
      questList = <div />;
    }
    return (
      <div>
        <Nav user={this.state.user} />
        {questList}
    	  <QuestForm />
      </div>
    );
  }
}
        // <QuestList userId={this.state.user.facebook_id} />

// React.render(<Main />, document.getElementById("content"));

module.exports = Main;
