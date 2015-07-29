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
      <div>
        <ul>
          {waypointList}
        </ul>
        <button className="ui black button" onClick={this.props.newWaypoint} style={styles.button}>New waypoint</button>
      </div>
    );
  }
}

var styles = {
  button: {
    margin: 5
  }
}

module.exports = WaypointList;
