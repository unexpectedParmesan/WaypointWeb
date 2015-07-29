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

  constructor(props) {
    super(props);
		this.state = {
			waypoint: {
				title: props.waypoint.title,
				description: props.waypoint.description,
				latitude: props.waypoint.latitude,
				longitude: props.waypoint.longitude
			}
		};
  }

	componentWillReceiveProps(nextProps) {
	    this.setState({
	      waypoint: {
	        title: nextProps.waypoint.title,
	        description: nextProps.waypoint.description,
	        latitude: nextProps.waypoint.latitude,
	        longitude: nextProps.waypoint.longitude,
	      }
	    });
}


  save() {

	  var value = this.refs.waypointForm.getValue();

	  if (this.state.waypoint) {
	    var validation = this.refs.waypointForm.validate();
	    if (validation.errors.length > 0) {
	    } else {
	      var newWaypoint = {
	        quest_id: this.props.waypoint.quest_id,
					title: value.title,
					description: value.description,
					latitude: value.latitude,
					longitude: value.longitude,
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
    	  <form className="ui form">
		    	<FormView
		    	  ref="waypointForm"
		    	  type={Waypoint}
		        value={this.state.waypoint}/>
		    </form>
			<button className="ui button" onClick={this.save.bind(this)}>Save</button>
			<button className="ui button" onClick={this.destroy.bind(this)}>Delete</button>
      </div>
    );
	}

}

module.exports = WaypointForm;
