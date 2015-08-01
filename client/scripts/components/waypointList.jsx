var React = require('react');
var WaypointListItem = require('./waypointListItem.jsx');
// var api = require('../helpers/api.helper');

class WaypointList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      waypoints: [],
      newWaypointLink: {
        color: '#48B04A',
      }
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
          <div className="ui selection list">
            <div
              className="item"
              style={selectionStyle}>
              <WaypointListItem
                key={index}
                waypoint={waypoint}
                setCurrentWaypoint={this.props.setCurrentWaypoint} />
            </div>
          </div>
        );
      });
    }


    return (
      <div>
        <p style={styles.title}>Waypoints for {this.props.quest.title}</p>
          <a
           onMouseOver={()=>{
             this.setState({
               newWaypointLink: {
                 color: '#2F9032',
                 cursor: 'pointer',
               }
             })
           }}
           onMouseOut={()=>{
             this.setState({
               newWaypointLink: {
                 color: '#48B04A',
               }
             })
           }}
           onClick={this.props.waypointWillBeCreated}
           style={this.state.newWaypointLink} >
           Add New Waypoint
          </a>
          {waypointList}
      </div>
    );
  }
}

var styles = {
  title: {
    textAlign: 'left',
    fontSize: 18,
    color: '#2A2A2A',
  },
  button: {
    margin: 5
  },
  selected: {
    backgroundColor: '#f6f6f6',
    color: '#2A2A2A',
  }
};

module.exports = WaypointList;
