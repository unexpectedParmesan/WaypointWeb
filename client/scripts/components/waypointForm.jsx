var React = require('react');
var tform = require('tcomb-form');

var FormView = tform.form.Form;

var Waypoint = tform.struct({
	title: tform.Str,
	description: tform.Str,
  // mediaUrl: tform.Str,
});

var options = {
  fields: {
    description: {
    type: 'textarea'
    }
  }
};

class WaypointForm extends React.Component {

  constructor(props) {
    super(props);
		this.state = {
			waypoint: {
				title: props.waypoint.title,
				description: props.waypoint.description,
				latitude: props.waypoint.latitude,
				longitude: props.waypoint.longitude,
				mediaUrl: props.waypoint.mediaUrl
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
	        mediaUrl: nextProps.waypoint.mediaUrl
	      }
	    });
	}

  save() {

	  var value = this.refs.waypointForm.getValue();
	  console.log(value);
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
					media_url: value.mediaUrl,
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
    	<div className="ui inverted red segment">
    	  <form className="ui inverted form">
		    	<FormView
		    	  ref="waypointForm"
		    	  type={Waypoint}
		    	  options={options}
		        value={this.state.waypoint}/>
		    </form>
			<button className="ui black button" onClick={this.save.bind(this)} style={styles.button}>Save</button>
			<button className="ui black button" onClick={this.destroy.bind(this)} style={styles.button}>Delete</button>
      </div>
    );
	}

}

var styles = {
	button: {
		margin: 5
	}
}

module.exports = WaypointForm;
