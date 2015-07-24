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
    this.state = {
      map: null,
      markers: [],
    };
  }

  componentDidMount () {
    // create map
    this.createMap();
  }

  render () {

    return (
      <div className='googleMap'>
        <div style={styles.markerStyles}>{this.state.markers}</div>
        <div ref="mapCanvas" style={styles.mapStyles} ></div>
        }
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
    return this.map;
  }

  createMarker (lat, lng) {
    var context = this;
    var marker = new GoogleMaps.Marker({
      position: new GoogleMaps.LatLng(lat, lng),
      map: this.state.map,
      title: this.position,
    });

    GoogleMaps.event.addListener(marker, 'click', function(event) {
      console.log(event);
      console.log('marker clicked');
      context.displayInfo(event)
      marker.setMap(null);
      marker = null;
    })

    this.state.markers.push(marker);
    console.log(this.state.markers);
  }

  displayInfo (event) {
    console.log('marker clicked, display some info');
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