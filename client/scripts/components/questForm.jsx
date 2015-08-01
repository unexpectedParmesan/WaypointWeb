var React = require('react');
var Map = require('./map.jsx');
var tform = require('tcomb-form');
var semantic = require('tcomb-form/lib/templates/semantic');
tform.form.Form.templates = semantic;

var FormView = tform.form.Form;

var Quest = tform.struct({
  title: tform.Str,
  description: tform.maybe(tform.Str),
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
		this.state = {
			quest: {
				title: props.quest.title,
				description: props.quest.description,
				length: props.quest.length,
				estimatedTime: props.quest.estimated_time,
			},
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
      <div className="ui segment" style={styles.questForm}>
        <form className="ui form">
        <FormView
          ref="questForm"
          type={Quest}
          options={options}
          value={this.state.quest}
          style={styles.form}/>
        </form>
        <button className="ui tiny green button" onClick={this.save.bind(this)} style={styles.saveButton}>Save</button>
        <a onClick={this.props.closeQuestForm} style={styles.cancelLink}>Cancel</a>
        <button className="ui tiny red button" onClick={this.destroy.bind(this)} style={styles.deleteButton}>Delete</button>
      </div>
    );
  }
}

var styles = {
  questForm: {
    marginBottom: 30,
  },
  saveButton: {
    marginTop: 15,
    marginRight: 10,
  },
  deleteButton: {
    marginTop: 15,
    float: 'right',
  },
  cancelLink: {
    position: 'relative',
    marginLeft: '10',
    fontSize: '14',
    top: 3,
    color: '#909090',
    cursor: 'pointer',
  }
};

module.exports = QuestForm;
