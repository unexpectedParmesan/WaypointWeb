var QuestFormStore = require('../stores/questForm.store.js');
var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var User = require('../stores/user.store');
var tform = require('tcomb-form');

var FormView = tform.form.Form;


var Quest = tform.struct({
	title: tform.Str,
	length: tform.Str,
	description: tform.Str,
	estimated_time: tform.Str
});

var QuestForm = React.createClass({
	mixins: [Reflux.connect(QuestFormStore)],

	getIntialState: function(){
    return QuestFormStore.getDefaultData();
	},

  save: function() {
  	var value = this.refs.form.getValue();

  	if (value) {
  		console.log(value);
      console.log(this.state);
  	}
  },

  componentDidMount: function(){
  	console.log("All up in componentDidMount");
    Actions.getUserData();
  },

  render: function() {
    return(
    	<div>
    	<FormView
    	  ref="form"
    	  type={Quest}
        />
        <button onClick={this.save}>Save</button>
      </div>

    );
  }
});

module.exports = QuestForm;