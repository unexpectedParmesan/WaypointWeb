/* 
** Map component used by Waypoint Form component
** Map component created with http://react-components.com/component/react-google-maps
*/

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var GoogleMaps = window.google.maps;

class WaypointMap extends React.Component {
  constructor(props) {
    super(props);
    var markers = (!this.props.waypoints) ? [] : this.props.waypoints;

    this.state = {
      map: null,
      markers: markers,
    };
  }


  componentDidMount () {
    this.createMap();
  }

  render () {

    return (
      <div className='googleMap'>
        <div ref="mapCanvas" style={styles.mapStyles} ></div>
      </div>
    )
  }

  createMap () {

    var mapOptions = {
      minZoom: 9,
      zoom: 16, 
      center: new GoogleMaps.LatLng(37.7837235,-122.4089778)
      
    };
    this.state.map = new GoogleMaps.Map(this.refs.mapCanvas.getDOMNode(), mapOptions);
    var context = this;
    GoogleMaps.event.addListener(this.state.map, 'click', function (event) {
      context.createMarker(event.latLng.A, event.latLng.F);
    });

    if (this.props.waypoints) {
      _.each(this.props.waypoints, function(obj){
        this.createMarker(obj.latitude, obj.longitude);
      }, this)
    }

    return this.map;
  }

  createMarker (lat, lng) {
    var context = this;
    var marker = new GoogleMaps.Marker({
      position: new GoogleMaps.LatLng(lat, lng),
      map: this.state.map,
      animation: GoogleMaps.Animation.DROP,
      draggable: true,
    });

    var infoBox = new GoogleMaps.InfoWindow({
      content: lat + ', ' + lng + ''
    });

    GoogleMaps.event.addListener(marker, 'click', function(event) {      
      infoBox.open(context.state.map, marker);
    })

    GoogleMaps.event.addListener(marker, 'dblclick', function(event) {
      marker.setMap(null);
      marker = null;
    })

    this.state.markers.push(marker);
    marker.setMap(this.state.map);
  }
}


var styles = {
  markerStyles: {
    height: 30,
    margin: 10,
  },
  mapStyles: {
    flex: 1,
    height: 500,
  }
};



module.exports = WaypointMap;