var React = require('react');
var QuestListItem = require('./questListItem.jsx');

class QuestList extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    var questList;
    questList = this.props.quests.map((quest, index) => {

      var selectionStyle;
      if (quest.id === this.props.currentQuest) {
        selectionStyle = styles.selected;
      }

      return (
        <tr style={selectionStyle}>
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
        <h3 style={styles.title}> Quests </h3>
        <table className="ui inverted table segment">
          <tbody>
            {questList}
          </tbody>
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
  },
  selected: {
    backgroundColor: 'white',
    color: 'black',
  }
};

module.exports = QuestList;
