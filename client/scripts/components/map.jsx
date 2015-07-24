/* 
** Map component used by Waypoint Form component
** Map component created with http://react-components.com/component/react-google-maps
*/

var React = require('react');
var $ = require('jquery');
var GoogleMaps = window.google.maps;

class WaypointMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
    };
  }

  componentDidMount () {
    // create map
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
      zoom: 12, 
      center: new GoogleMaps.LatLng(37.7837235,-122.4089778)
      
    };
    this.state.map = new GoogleMaps.Map(this.refs.mapCanvas.getDOMNode(), mapOptions);
    var context = this;
    GoogleMaps.event.addListener(this.state.map, 'click', function (event) {
      context.createMarker(event.latLng.A, event.latLng.F);
      console.log('click happened!');
    });
    return this.map;
  }

  createMarker (lat, lng) {
    var marker = new GoogleMaps.Marker({
      position: new GoogleMaps.LatLng(lat, lng),
      map: this.state.map,
      title: 'Marker!',
    });
  }
}


var styles = {
  mapStyles: {
    flex: 1,
    height: 500,
  }
};



module.exports = WaypointMap;