'use strict';

var React = require('react');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ui menu inverted green navbar' style={styles.nav}>
        <div className="brand item"> Waypoints Beta </div>
        <div className="item" style={styles.quest}> Current Quest </div>
        <div className="item" style={styles.user}> {this.props.user.name}
          <img className="item" src={this.props.user.profile_pic} style={styles.pic} />
           <button className="item ui inverted black button"><a href='/logout'>Logout</a></button>
        </div>
      </div>
    );
  }
}

var styles = {
  nav: {
    fontSize: 30,
    marginBottom: 10,
    height: 90
  },
  user: {
    fontSize: 20
  },
  quest: {
    fontSize: 50
  },
  pic: {
    height: 100,
    width: 100
  }
};


module.exports = Nav;
