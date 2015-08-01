var React = require('react');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sixteen wide column">
        <div className="ui text menu" style={styles.nav}>
          <div style={styles.myQuestsLink} className="item link" onClick={this.props.openQuestList}>
            <img style={styles.waypointLogo} src="assets/waypoint_icon_2.svg" /><span>My Quests</span>
          </div>
          <div className="right menu">
            <div className="item" style={styles.user}>
              <img src={this.props.user.profile_pic} style={styles.pic} />
              {this.props.user.name}
            </div>
            <div className="item link"><a href="/logout">Logout</a></div>
          </div>
        </div>
      </div>
    );
  }
}

var styles = {
  nav: {
    fontSize: 16,
    marginTop: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    color: '#606060',
    background: '#eeeeee',
    borderBottom: '1px solid #e5e5e5',
  },
  myQuestsLink: {
    cursor: 'hand',
  },
  waypointLogo: {
    width: 14,
    top: 4,
    marginRight: 5,
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
