/*
** Map component used by Waypoint Form component
** Map component created with http://react-components.com/component/react-google-maps
*/

var React = require('react');
// var $ = require('jquery');
var _ = require('underscore');
var GoogleMaps = window.google.maps;

class WaypointMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [],
      currentWaypointId: props.currentWaypoint,
      // currentWaypointIndex: _.findWhere(props.waypoints, {id: props.currentWaypoint}).index_in_quest,
    };
  }


  componentDidMount () {
    var markers = [];

    this.createMap(() => {
      this.props.waypoints.forEach(function(waypoint) {

        var marker = this.createMarker(waypoint.latitude, waypoint.longitude, waypoint.index_in_quest);
        if (waypoint.id === this.state.currentWaypointId) {
          marker.setOpacity(1);
          marker.setDraggable(true);
        }
        markers.push(marker);

      }.bind(this));
      this.setState({ markers });
    });
  }

  componentWillReceiveProps(nextProps) {

    console.log('recieved nextProps', nextProps);

    this.setState({
      currentWaypointId: nextProps.currentWaypoint,
      // currentWaypointIndex: _.findWhere(nextProps.waypoints, {id: nextProps.currentWaypoint}).index_in_quest,
    }, () => {

      var markers = _.clone(this.state.markers);

      if (markers.length !== nextProps.waypoints.length) {

        markers.forEach((marker) => {
          marker.setMap(null);
        });

        markers = [];

        nextProps.waypoints.forEach((waypoint) => {
          var marker = this.createMarker(waypoint.latitude, waypoint.longitude, waypoint.index_in_quest);
          if (waypoint.id === this.state.currentWaypointId) {
            marker.setOpacity(1);
            marker.setDraggable(true);
          }
          markers.push(marker);
        });

        this.setState({ markers });

      } else {

        var waypoint = _.findWhere(this.props.waypoints, {id: this.state.currentWaypointId});

        markers.forEach((marker) => {
          if (marker.index === waypoint.index_in_quest) {
            marker.setOpacity(1);
            marker.setDraggable(true);
          } else {
            marker.setOpacity(0.5);
            marker.setDraggable(false);
          }
        });
      }
    });
  }

  handleMarkerDrop(markerPos) {
    var coords = {
      latitude: markerPos.G,
      longitude: markerPos.K,
    };

    this.props.updateWaypoint(coords);
  }

  handleMarkerClick(markerIndex) {
    var markers = _.clone(this.state.markers);
    var waypoint = _.findWhere(this.props.waypoints, {index_in_quest: markerIndex});

    markers.forEach((marker) => {
      if (marker.index === waypoint.index_in_quest) {
        marker.setOpacity(1);
        marker.setDraggable(true);
      } else {
        marker.setOpacity(0.5);
        marker.setDraggable(false);
      }
    });

    this.setState({ markers }, () => {
      this.props.setCurrentWaypoint(waypoint.id);
    });

  }

  render () {

    return (
      <div className='googleMap'>
        <input type="text" ref="search" style={styles.searchInput} />
        <div ref="mapCanvas" style={styles.mapStyles} ></div>
      </div>
    );
  }

  createMap (callback) {
    var context = this;

    // default map centers on Hack Reactor
    var mapOptions = {
      minZoom: 9,
      zoom: 16,
      center: new GoogleMaps.LatLng(37.7837235, -122.4089778)

    };

    // add the map to the page
    var newMap = new GoogleMaps.Map(this.refs.mapCanvas.getDOMNode(), mapOptions);

    // create the places searchBox
    var searchBox = new GoogleMaps.places.SearchBox(this.refs.search.getDOMNode());

    // put the search box in the top left-hand corner
    newMap.controls[GoogleMaps.ControlPosition.TOP_LEFT].push(this.refs.search.getDOMNode());

    // add listener to search box
    GoogleMaps.event.addListener(searchBox, 'places_changed', function () {
      // get the objects for the places returned by the user's search
      var places = searchBox.getPlaces();
      console.log(places);
      // if no places found, return
      if (places.length === 0) { return; }

      // iterate over each place and create a marker for that place
      _.each(places, function(place) {
        console.log('place', place);
        context.props.newWaypoint(place.geometry.location.A, place.geometry.location.F);
        console.log('the map\'s props',context.props);
        console.log('the map\'s currentWaypoint',context.props.currentWaypoint);
        var marker = context.createMarker(place.geometry.location.A, place.geometry.location.F);
        console.log('marker created', marker)
      });
    });

    this.setState({ map: newMap }, () => {
      callback.bind(this)();


      // listen for clicks on the map and add a marker for where the user clicks
      // GoogleMaps.event.addListener(this.state.map, 'click', function (event) {
      //   context.createMarker(event.latLng.A, event.latLng.F);
      // });

      // if there are already waypoints set for this quest, add them to the map when the page loads
      // if (this.props.waypoints) {
      //   _.each(this.props.waypoints, function(obj) {
      //     // console.log('creating marker for this waypoint:', obj);
      //     this.createMarker(obj.latitude, obj.longitude, obj.index_in_quest);
      //   }, this);
      // }
    });

  }

  createMarker (lat, lng, index) {

    var marker = new GoogleMaps.Marker({
      index: index,
      position: new GoogleMaps.LatLng(lat, lng),
      map: this.state.map,
      // animation: GoogleMaps.Animation.DROP,
      // label: this.state.count,
      opacity: 0.5,
    });

    // create an InfoWindow for each marker that displays the lat, lng for that location
    var infoBox = new GoogleMaps.InfoWindow({
      content: lat + ', ' + lng + ' index: ' + index
    });

    // when a marker is clicked once, show the infoBox
    GoogleMaps.event.addListener(marker, 'click', (event) => {
      // infoBox.open(context.state.map, marker);
      this.handleMarkerClick(index);
    });

    GoogleMaps.event.addListener(marker, 'dragend', () => {
      console.log('new marker location:', marker.getPosition());
      this.handleMarkerDrop(marker.getPosition());
    });

    // // when a marker is clicked twice, remove the marker
    // GoogleMaps.event.addListener(marker, 'dblclick', function(event) {
    //
    //   // remove marker from the map and delete the marker
    //   marker.setMap(null);
    //   marker = null;
    //
    //   console.log(event);
    //
    //   _.each(context.state.markers, function(mark, index, collection) {
    //     console.log(mark);
    //     if ( (event.latLng.A === mark.position.A && event.latLng.F === mark.position.F)
    //      ) {
    //       console.log('found marker to delete');
    //       collection[index] = null;
    //     }
    //   }, this);
    //
    //   // remove the marker from this.state.markers
    //   console.log(context.state.markers);
    // });

    // var markers = _.clone(this.state.markers);
    // markers.push(marker);
    // this.setState({markers}, () => {
    //   marker.setMap(this.state.map);
    // });
    return marker;
  }
}

var styles = {
  searchInput: {
    backgroundColor: '#ffffff',
    height: 27,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 300,
    marginTop: 10,
    marginLeft: 12,
    paddingTop: 0,
    paddingRight: 11,
    paddingBottom: 0,
    paddingLeft: 13,
    width: 400,
  },
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
