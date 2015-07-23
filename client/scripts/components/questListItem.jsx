'use strict';

var React = require('react');
var WaypointList = require('./waypointList.jsx');


class QuestListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  updateSelectedQuest(id) {
    console.log('selected quest', id);
  }

  render() {

    this.props.quest.estimated_time = this.props.quest.estimated_time || 'unknown';

    return (
      <li
        onClick={() => {
          this.updateSelectedQuest(this.props.quest.id);
        }}
        >
        <div>
          <h3>{this.props.quest.title}</h3>
          <p>{this.props.quest.description}</p>
          <div>
            <span>waypoints: <b>{this.props.quest.waypoints.length}</b> - </span>
            <span>length: <b>{this.props.quest.length}</b> - </span>
            <span>estimated time: <b>{this.props.quest.estimated_time}</b></span>
            <br />

            <WaypointList quest={this.props.quest} />

            <br />
          </div>
        </div>
      </li>
    );
  }
}

module.exports = QuestListItem;
