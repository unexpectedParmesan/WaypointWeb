var React = require('react');
var Utils = require('../helpers/api.helper.js');
var tform = require('tcomb-form');

var FormView = tform.form.Form;


var Quest = tform.struct({
	title: tform.Str,
	length: tform.Str,
	description: tform.Str,
	estimatedTime: tform.Str
});

class QuestForm extends React.Component {

  constructor(props) {
    super(props);
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
    console.log('nextProps: ', nextProps);
    this.setState( {
      quest: {
        title: nextProps.quest.title,
        description: nextProps.quest.description,
        length: nextProps.quest.length,
        estimatedTime: nextProps.quest.estimated_time,
      }
    })
  }


  save() {

  	var value = this.refs.questForm.getValue();

  	if (value) {
      var newQuest = {
        title: value.title,
        length: value.length,
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
    	<div>
	    	<FormView
	    	  ref="questForm"
	    	  type={Quest}
	        value={this.state.quest}
	      />
			<button onClick={this.save.bind(this)}>Save</button>
      <button onClick={this.destroy.bind(this)}>Delete</button>
    </div>
  );
  }

}

module.exports = QuestForm;
