var React = require('react');
var QuestListItem = require('./questListItem.jsx');

class QuestList extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    var questList;
    if (this.props.quests.length) {
      questList = this.props.quests.map((quest, index) => {

        var selectionStyle;
        if (quest.id === this.props.currentQuest) {
          selectionStyle = styles.selected;
        }

        return (
          <div className="ui selection list">
            <div
              className="item"
              style={styles.item}
              onClick={ () => {
              this.props.closeQuestList(); }}>
              <QuestListItem
                key={index}
                quest={quest}
                deleteQuest={this.props.deleteQuest}
                closeQuestList={this.props.closeQuestList}
                setCurrentQuest={this.props.setCurrentQuest}/>
            </div>
          </div>

        );
      });
    }

    return (
      <div>
        <div style={styles.title}>
          <button className="ui green button" onClick={this.props.newQuest} style={styles.button}>New Quest</button>
        </div>
        {questList}
      </div>
    );
  }
}

var styles = {
  item: {
    padding: 20,
  },
  title:{
    textAlign: 'left',
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
