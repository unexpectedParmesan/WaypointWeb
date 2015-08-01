var React = require('react');
var _ = require('underscore');
var GoogleMaps = window.google.maps;

class WaypointMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [],
      currentWaypointId: props.currentWaypoint,
    };
  }

  componentDidMount () {
    var markers = [];

    this.createMap(() => {
      var bound = new GoogleMaps.LatLngBounds();
      this.props.waypoints.forEach(function(waypoint) {

        var marker = this.createMarker(waypoint.latitude, waypoint.longitude, waypoint.index_in_quest);
        bound.extend(marker.getPosition());
        if (waypoint.id === this.state.currentWaypointId) {
          marker.setOpacity(1);
          marker.setDraggable(true);
        }
        markers.push(marker);
      }.bind(this));

      this.state.map.fitBounds(bound);

      this.setState({ markers });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentWaypointId: nextProps.currentWaypoint,
    }, () => {

      var markers = _.clone(this.state.markers);

      if (markers.length !== nextProps.waypoints.length) {

        markers.forEach((marker) => {
          marker.setMap(null);
        });

        markers = [];

        var bound = new GoogleMaps.LatLngBounds();

        nextProps.waypoints.forEach((waypoint) => {
          var marker = this.createMarker(waypoint.latitude, waypoint.longitude, waypoint.index_in_quest);
          bound.extend(marker.getPosition());
          if (waypoint.id === this.state.currentWaypointId) {
            marker.setOpacity(1);
            marker.setDraggable(true);
          }
          markers.push(marker);
        });

        this.state.map.fitBounds(bound);

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

    var display;
    if (!this.props.hideSearchInput) {
      display = styles.searchInput;
    } else {
      display = styles.hidden;
    }

    return (
      <div className='googleMap'>
        <input type="text" ref="search" style={display} />
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
      center: new GoogleMaps.LatLng(37.7837235, -122.4089778),
      compassEnabled: false,
      panControl: false,
      zoomControlOptions: {
        style: GoogleMaps.ZoomControlStyle.SMALL,
        position: GoogleMaps.ControlPosition.TOP_LEFT
      }

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
      // if no places found, return
      // TODO: tell user that their query returned no results
      if (places.length === 0) { return; }
      var place = places[0];
      console.log(place);
      // create a marker for the place
      context.props.newWaypoint(place.geometry.location.G, place.geometry.location.K);
    });

    this.setState({ map: newMap }, () => {
      callback.bind(this)();


      // listen for clicks on the map and add a marker for where the user clicks
      GoogleMaps.event.addListener(this.state.map, 'click', function (event) {
        // only add waypoint when hideSearchInput is false
        if (context.props.hideSearchInput) {
          return;
        } else {
          context.props.newWaypoint(event.latLng.G, event.latLng.K);
        }
      });
    });
  }

  createMarker (lat, lng, index) {

    var marker = new GoogleMaps.Marker({
      index: index,
      position: new GoogleMaps.LatLng(lat, lng),
      map: this.state.map,
      opacity: 0.5,
    });

    GoogleMaps.event.addListener(marker, 'click', () => {
      this.handleMarkerClick(index);
    });

    GoogleMaps.event.addListener(marker, 'dragend', () => {
      console.log('new marker location:', marker.getPosition());
      this.handleMarkerDrop(marker.getPosition());
    });

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
    marginTop: 30,
    marginLeft: 12,
    paddingTop: 0,
    paddingRight: 11,
    paddingBottom: 0,
    paddingLeft: 13,
    width: 250,
    border: '1px solid #EEEEEE',
    borderRadius: 3,
  },
  hidden: {
    display: 'none',
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
