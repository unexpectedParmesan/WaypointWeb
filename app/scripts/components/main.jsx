var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var Login = require('./login');

var Landing = require('./landing');
var Home = require('./home');

var Main = React.createClass({

  getInitialState: function(){
    return {
      content: <Landing />
    };
  },

  updatePageContent: function(value){
    console.log('in updatePageContent', value)
    if (value === 'log_out') { // user is logged out
      this.setState({
        content: <Landing />
      });
    } else { // user is logged in
      this.setState({
        content: <Home />
      });
    }
  },

  render: function() {
    return(
      <div>
        <Login onLoginUpdate={this.updatePageContent.bind(this)} />
        {this.state.content}
      </div>
    );
  }
});

module.exports = Main;
