var React = require('react');
var Map = require('./map.jsx');
var tform = require('tcomb-form');
var semantic = require('tcomb-form/lib/templates/semantic');
tform.form.Form.templates = semantic;

var FormView = tform.form.Form;

var Quest = tform.struct({
  title: tform.Str,
  description: tform.Str,
  estimatedTime: tform.Str
});

var options = {
  fields: {
    description: {
    type: 'textarea'
    }
  }
};

class QuestForm extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.quest.title)
		this.state = {
			quest: {
				title: props.quest.title,
				description: props.quest.description,
				length: props.quest.length,
				estimatedTime: props.quest.estimated_time,
			}
		};
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.quest) { return; }

    this.setState({
      quest: {
        title: nextProps.quest.title,
        description: nextProps.quest.description,
        estimatedTime: nextProps.quest.estimated_time,
      }
    });
  }


  save() {

    var value = this.refs.questForm.getValue();
    console.log(value);
    if (value) {
      var newQuest = {
        title: value.title,
        description: value.description,
        estimated_time: value.estimatedTime,
        creator_facebook_id: this.props.userId,
        id: this.props.quest.id
      };
      this.props.updateQuest(newQuest);
    }

  }

  destroy() {
    this.props.deleteQuest();
  }

  render() {
    return (
    	<div className="ui segment">
        <form className="ui form">
        <h4>You are currently editing: {this.state.quest.title}</h4>
	    	<FormView
	    	  ref="questForm"
	    	  type={Quest}
          options={options}
	        value={this.state.quest}
          style={styles.form}/>
        </form>
        <button className="ui tiny green button" onClick={this.save.bind(this)} style={styles.button}>Save</button>
        <a onClick={this.props.closeQuestForm}>Cancel</a>
    	</div>
  	);
  }

}

var styles = {
  button: {
    margin: 5
  }
};

module.exports = QuestForm;
