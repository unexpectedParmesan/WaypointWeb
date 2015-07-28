'use strict';

var React = require('react');


class WaypointListItem extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <li
        onClick={() => {
          this.props.setCurrentWaypoint(this.props.waypoint.id);
        }}
      >
        <div>
          <h4>{this.props.waypoint.title}</h4>
          <p>{this.props.waypoint.description}</p>
          <div>
            <span>{this.props.waypoint.latitude}, {this.props.waypoint.longitude}</span>
            <br />
            <span>index in quest: {this.props.waypoint.index_in_quest}</span>
            <br />
          </div>
        </div>
      </li>
    );
  }
}

module.exports = WaypointListItem;
