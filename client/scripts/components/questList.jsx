var React = require('react');
// var Reflux = require('reflux');
// var Actions = require('../actions/actions');
// var User = require('../stores/user.store');
var QuestListItem = require('./questListItem.jsx');
var api = require('../helpers/api.helper');

class QuestList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quests: [],
    };
  }

  componentDidMount() {
    api.getQuests(this.props.userId).then(function(quests) {
      // console.log(quests);
      this.setState({ quests });
    }.bind(this));
  }

  render() {

    var questList;
    if (!this.state.quests.length) {
      questList = <div />;
    } else {
      questList = this.state.quests.map(function(quest, index) {
        return (
          <QuestListItem key={index} quest={quest} />  
        );
      });
    }

    return (
      <ul>
        {questList}
      </ul>
    );
  }
}

module.exports = QuestList;
