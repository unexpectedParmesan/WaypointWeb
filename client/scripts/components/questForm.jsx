var React = require('react');
var Utils = require('../helpers/api.helper.js');
var User = require('../stores/user.store');
var tform = require('tcomb-form');
var WaypointForm = require('./waypointForm.jsx');

var FormView = tform.form.Form;


var Quest = tform.struct({
	title: tform.Str,
	length: tform.Str,
	description: tform.Str,
	estimatedTime: tform.Str
});

var QuestForm = React.createClass({
  
  getInitialState: function(){
    return {
      value: null,
      isSubmitted: false
    }
  },

  save: function() {
  	var value = this.refs.questForm.getValue();
    var user = this.props.user;

  	if (value) {
      var newQuest = {
        title: value.title,
        length: value.length,
        description: value.description,
        estimatedTime: value.estimatedTime,
        facebookId: user.facebook_id
      }
      console.log("Quest saved: ", newQuest);
      Utils.saveQuest(newQuest, "POST").then(function(response){
        console.log(response);
      });
      this.setState({value: null});
      this.setState({isSubmitted: true});
  	}

  },

  componentDidMount: function(){
    Actions.getUserData();
  },

  render: function() {
    return(
    	<div>
    	<FormView
    	  ref="questForm"
    	  type={Quest}
        value={this.state.value}
        />
        <button onClick={this.save}>Save</button>
        {this.state.isSubmitted ? <WaypointForm /> : <div></div>}
      </div>

    );
  }
});

module.exports = QuestForm;