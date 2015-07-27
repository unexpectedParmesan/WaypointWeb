var React = require('react');
var tform = require('tcomb-form');

var FormView = tform.form.Form;

var Waypoint = tform.struct({
	title: tform.Str,
	description: tform.Str,
  latitude: tform.Num,
  longitude: tform.Num
});

class WaypointForm extends React.Component {
	// mixins: [Reflux.connect(QuestFormStore)],

  constructor(props) {
    super(props);
		console.log(props);
		this.state = {
			waypoint: {
				title: props.waypoint.title,
				description: props.waypoint.description,
				latitude: props.waypoint.latitude,
				longitude: props.waypoint.longitude,
				// indexInQuest: props.waypoint.indexInQuest,
			}
		};
  }

	componentWillReceiveProps(nextProps) {
	    console.log('waypoint form receiving new props: ', nextProps);
	    this.setState({
	      waypoint: {
	        title: nextProps.waypoint.title,
	        description: nextProps.waypoint.description,
	        latitude: nextProps.waypoint.latitude,
	        longitude: nextProps.waypoint.longitude,
	        // indexInQuest: nextProps.waypoint.indexInQuest,
	      }
	    });
}

	// onChange(val) {
	// 	this.setState({
	// 		value: val,
	// 		// indexInQuest: 0
	// 	});
	// }

  save() {

		var value = this.refs.waypointForm.getValue();

	  if (this.state.waypoint) {
	    var validation = this.refs.waypointForm.validate();
	    if (validation.errors.length > 0) {
	      console.log('Error: ', validation.errors[0].message);
	    } else {
				console.log('this.props.waypoint:', this.props.waypoint);
	      var newWaypoint = {
	        quest_id: this.props.waypoint.quest_id,
					title: value.title,
					description: value.description,
					latitude: value.latitude,
					longitude: value.longitude,
					// index_in_quest: this.props.waypoint.index_in_quest,
					id: this.props.waypoint.id,
	      };
				this.props.updateWaypoint(newWaypoint);
			}
    }
  }

	destroy() {
		this.props.deleteWaypoint();
	}

	render() {
    return (
    	<div>
	    	<FormView
	    	  ref="waypointForm"
	    	  type={Waypoint}
	        value={this.state.waypoint}
	      />
				<button onClick={this.save.bind(this)}>Save</button>
				<button onClick={this.destroy.bind(this)}>Delete</button>
      </div>
    );
					// onChange={this.onChange.bind(this, this.state.waypoint)}
	}

}

module.exports = WaypointForm;
