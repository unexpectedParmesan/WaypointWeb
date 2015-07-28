'use strict';

var React = require('react');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className='ui menu navbar' style={styles.nav}>
        <div className="brand item"> Waypoints Beta </div>
        <div className="item" style={styles.quest}> Current Quest </div>
        <div className="item" style={styles.user}> {this.props.user.name}
          <img className="item" src={this.props.user.profile_pic} style={styles.pic} />
           <a className="item"href='/logout'>Logout</a>
        </div>
      </div>
    );
  }
}

var styles = {
  nav: {
    fontSize: 30,
    marginBottom: 30
  },
  user: {
    fontSize: 20
  },
  quest: {
    fontSize: 50
  },
  pic: {
    height: 120,
    width: 120
  }
};


module.exports = Nav;
