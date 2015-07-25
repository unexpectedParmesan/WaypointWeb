var React = require('react');
var WaypointListItem = require('./waypointListItem.jsx');
// var api = require('../helpers/api.helper');

class WaypointList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waypoints: [],
    };
  }

  componentDidMount() {

  }



  render() {

    var waypointList;
    if (!this.props.quest.waypoints) {
      waypointList = <div></div>;
    } else {
      waypointList = this.props.quest.waypoints.map((waypoint, index) => {
        return (
          <WaypointListItem
            key={index}
            waypoint={waypoint}
            setCurrentWaypoint={this.props.setCurrentWaypoint}
          />
        );
      });
    }


    return (
      <ul>
        {waypointList}
      </ul>
    );
  }
}

module.exports = WaypointList;
