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
          setCurrentQuest={this.props.setCurrentQuest}/>
      
      );
    });

    return (
      <div>
        <table className="ui selectable inverted table">
          <thead>Quests
          <tbody>
          {questList}
          </tbody>
          </thead>
        </table>
        <button className="ui button" onClick={this.props.newQuest}>New quest</button>
      </div>
    );
  }
}

module.exports = QuestList;
