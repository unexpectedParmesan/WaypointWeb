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

  render() {

    var waypointList;
    if (!this.props.quest.waypoints) {
      waypointList = <div></div>;
    } else {
      waypointList = this.props.quest.waypoints.map((waypoint, index) => {

        var selectionStyle;
        if (waypoint.id === this.props.currentWaypoint) {
          selectionStyle = styles.selected;
        }

        return (
          <tr style={selectionStyle}>
            <td>
              <WaypointListItem
                key={index}
                waypoint={waypoint}
                setCurrentWaypoint={this.props.setCurrentWaypoint}/>
            </td>
          </tr>
        );
      });
    }


    return (
      <div>
        <h3 style={styles.title}> Waypoints </h3>
        <table className="ui inverted table segment">
          <tbody>
            {waypointList}
          </tbody>
        </table>
        <button className="ui black button" onClick={this.props.waypointWillBeCreated} style={styles.button}>New waypoint</button>
      </div>
    );
  }
}

var styles = {
  title: {
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

module.exports = WaypointList;
