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
        <tr>
          <td>
            <QuestListItem
              key={index}
              quest={quest}
              setCurrentQuest={this.props.setCurrentQuest}/>
          </td>
        </tr>
      
      );
    });

    return (
      <div>
        <table className="ui inverted table segment">
          <h3 style={styles.title}> Quests </h3>
          {questList}
        </table>
        <button className="ui black button" onClick={this.props.newQuest} style={styles.button}>New quest</button>
      </div>
    );
  }
}

var styles = {
  title:{
    textAlign: 'center',
    fontSize: 30
  },
  button: {
    margin: 5
  }
}

module.exports = QuestList;
