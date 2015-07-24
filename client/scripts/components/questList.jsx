var React = require('react');
var QuestListItem = require('./questListItem.jsx');

class QuestList extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    var questList;
    questList = this.props.quests.map((quest, index) => {
      return (
        <QuestListItem
          key={index}
          quest={quest}
          setCurrentQuest={this.props.setCurrentQuest}
        />
      );
    });

    return (
      <div>
        <ul>
          {questList}
        </ul>
        <button onClick={this.props.newQuest}>new quest</button>
      </div>
    );
  }
}

module.exports = QuestList;
