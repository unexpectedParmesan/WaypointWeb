var React = require('react');

class WaypointListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div
        style={styles.item}
        onClick={() => {
          this.props.setCurrentWaypoint(this.props.waypoint.id);
        }} >
        <div>
          <p style={styles.title}>{this.props.waypoint.title}</p>
          <p style={styles.description}>{this.props.waypoint.description}</p>
        </div>
      </div>
    );
  }
}

var styles = {
  item: {
    padding: 10,
  },
  title: {
    color: '#3784d3',
  },
  description: {
    color: '#909090',
  },
};

module.exports = WaypointListItem;
