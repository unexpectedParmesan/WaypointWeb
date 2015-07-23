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
	estimatedTime: tform.Str
});

var QuestForm = React.createClass({
	mixins: [Reflux.connect(QuestFormStore)],
  
  getInitialState: function(){
    return {
      value: null,
      isSubmitted: false
    }
  },

  save: function() {
  	var value = this.refs.form.getValue();
    var user = this.props.user;

  	if (value) {
      var newQuest = {
        title: value.title,
        length: value.length,
        description: value.description,
        estimatedTime: value.estimatedTime,
        facebookId: user.facebook_id
      }

      //POST newQuest to db
      this.setState({value: null});
      this.setState({isSubmitted: true});
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
        value={this.state.value}
        />
        <button onClick={this.save}>Save</button>
      </div>

    );
  }
});

module.exports = QuestForm;