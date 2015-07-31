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
            <div className="item" onClick={ () => {
              this.props.onSetSidebarOpen(false);
              this.props.editQuest();
            }}>
              <QuestListItem
                key={index}
                quest={quest}
                deleteQuest={this.props.deleteQuest}
                editQuest={this.props.editQuest}
                setCurrentQuest={this.props.setCurrentQuest}/>
            </div>
          </div>

        );
      });
    }

    return (
      <div>
        <div style={styles.title}>
          <h4>My Quests</h4>
          <button className="ui green button" onClick={this.props.newQuest} style={styles.button}>New Quest</button>
        </div>
        {questList}
      </div>
    );
  }
}

var styles = {
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
