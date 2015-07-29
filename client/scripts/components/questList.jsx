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
        {questList}
        <button className="ui black button" onClick={this.props.newQuest} style={styles.button}>New quest</button>
      </div>
    );
  }
}

var styles = {
  button: {
    margin: 5
  }
}

module.exports = QuestList;
