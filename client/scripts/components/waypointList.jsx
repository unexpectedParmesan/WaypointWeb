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



  var waypointList = this.props.quest.waypoints.map(function(waypoint, index) {
    return (
      <WaypointListItem
        key={index}
        waypoint={waypoint}
      />
    );
  }.bind(this));


    return (
      <ul>
        {waypointList}
      </ul>
    );
  }
}

module.exports = WaypointList;
