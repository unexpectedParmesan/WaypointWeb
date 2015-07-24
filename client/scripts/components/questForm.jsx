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
      isSubmitted: false,
      questId: null
    }
  },

  save: function() {
  	var value = this.refs.questForm.getValue();
    var user = this.props.user;
    var context = this;

  	if (value) {
      var newQuest = {
        title: value.title,
        length: value.length,
        description: value.description,
        estimatedTime: value.estimatedTime,
        facebookId: user.facebook_id
      }
      Utils.saveQuest(newQuest, "POST").then(function(response){
        console.log("Post request successful: ", response);
        context.setState({questId: response.id});
        context.setState({isSubmitted: true});
      });

      this.setState({value: null});
  	}

  },

  // componentDidMount: function(){
  //   Actions.getUserData();
  // },

  render: function() {
    return(
    	<div>
    	<FormView
    	  ref="questForm"
    	  type={Quest}
        value={this.state.value}
        />
        <button onClick={this.save}>Save</button>
        {this.state.isSubmitted ? <WaypointForm questId={this.state.questId} /> : <div></div>}
      </div>

    );
  }
});

module.exports = QuestForm;