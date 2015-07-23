'use strict';

var React = require('react');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className='navbar'>
        ======= {this.props.user.name} ====== <a href='/logout'>Logout</a>
      </div>
    );
  }
}

module.exports = Nav;
