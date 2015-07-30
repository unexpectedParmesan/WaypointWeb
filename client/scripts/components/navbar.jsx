'use strict';

var React = require('react');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui borderless menu" style={styles.nav}>
        <div className="brand item"> Waypoint Beta </div>
        <div className="right menu">
          <div className="item" style={styles.user}>
            <img className="item" src={this.props.user.profile_pic} style={styles.pic} />
            {this.props.user.name}
          </div>
          <div className="item"><a href="/logout">Logout</a></div>
        </div>
      </div>
    );
  }
}

var styles = {
  nav: {
    fontSize: 16,
    marginBottom: 10,
    height: 40,
    flex: 1,
    color: '#606060',
  },
  user: {
  },
  quest: {
    fontSize: 18
  },
  pic: {
    width: 70,
    background: '##9E9E9E',
    left: 10,
  }
};


module.exports = Nav;
