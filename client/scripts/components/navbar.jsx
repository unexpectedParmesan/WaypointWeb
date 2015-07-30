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
            <img src={this.props.user.profile_pic} style={styles.pic} />
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
    height: 36,
    width: 36,
    borderRadius: 18,
    marginRight: 10,
    background: '##9E9E9E',
    left: 10,
  }
};


module.exports = Nav;
