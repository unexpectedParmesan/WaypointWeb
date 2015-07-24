var QuestFormStore = require('../stores/questForm.store.js');
var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var tform = require('tcomb-form');
var Utils = require('../helpers/api.helper.js');

var FormView = tform.form.Form;

var Waypoint = tform.struct({
	title: tform.Str,
	description: tform.Str,
  latitude: tform.Num,
  longitude: tform.Num
});

var WaypointForm = React.createClass({
	// mixins: [Reflux.connect(QuestFormStore)],
  
  getInitialState: function(){
    return {
    	value: null,
    	isSubmitted: false
    }
  },

  onChange: function(val){
    this.setState({
    	value: val,
      indexInQuest: 0
    })
  },

  save: function() {
	  var value = this.state.value;
    var user = this.props.user;
    var context = this;

	  if (value) {
    var validation = this.refs.waypointForm.validate();
    if (validation.errors.length > 0){
      console.log("Error: ", validation.errors[0].message);
    }
      var newWaypoint = {
        questId: this.props.questId,
				indexInQuest: this.state.indexInQuest,
				latitude: value.latitude,
				longitude: value.longitude,
				title: value.title,
				description: value.description
      };
      console.log("Waypoint saved: ", newWaypoint);
      Utils.saveWaypoint(newWaypoint, "POST").then(function(response){
        console.log("Post was successful: ", response);
        context.setState({indexInQuest: context.state.indexInQuest++});
      });

      this.setState({value: null});
    }
  },

	render: function(){
    return(
    	<div>
    	<FormView
    	  ref="waypointForm"
    	  type={Waypoint}
        value={this.state.value}
        onChange = {this.onChange}
        />
        <button onClick={this.save}>Save</button>
      </div>
    )
	}

});

module.exports = WaypointForm;