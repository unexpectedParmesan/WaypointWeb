'use strict';

var React = require('react');

class QuestListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      questItemStyle: {
        background: 'none',
      }
    };
  }

  render() {
    if (this.props.quest) {
      this.props.quest.estimated_time = this.props.quest.estimated_time || 'unknown';

      return (
        <div 
          style={styles.item}
          className="content"
          onClick={() => {
            this.props.setCurrentQuest(this.props.quest.id);
            this.props.closeQuestList();
          }} >
          <div>
            <p className="header" style={styles.title}>
              {this.props.quest.title}
            </p>
            <p className="description" style={styles.description}>{this.props.quest.description}</p>
            <div style={styles.details}>
              <span>waypoints: <b>{this.props.quest.waypoints ? this.props.quest.waypoints.length : 0}</b> - </span>
              <span>estimated time: <b>{this.props.quest.estimated_time}</b></span>
            </div>
          </div>
        </div>
      );

    } else {
      return;
    }
  }
}

var styles = {
  icons: {
    textAlign: 'right',
    width: 41,
    float: 'right',
    position: 'relative',
  },
  title: {
    color: '#3784d3',
  },
  description: {
    color: '#909090',
  },
  details: {
    fontSize: 12,
  },
  item: {
    padding: 10,
  },
};

module.exports = QuestListItem;
