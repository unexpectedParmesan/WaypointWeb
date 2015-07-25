'use strict';

var React = require('react');
var QuestForm = require('./questForm.jsx');
var WaypointForm = require('./waypointForm.jsx');
var QuestList = require('./questList.jsx');
var WaypointList = require('./waypointList.jsx');
var Nav = require('./navbar.jsx');
var api = require('../helpers/api.helper');

var Map = require('./map.jsx');

// helper for getting the index of current quest or waypoint
function indexOfProperty(array, key, targetVal) {
  console.log('calling indexOfProperty');
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === targetVal) {
      return i;
    }
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        facebook_id: null
      },
      quests: null,
      currentQuest: null,
      currentWaypoint: null,
      index: 0
    };
  }

  componentDidMount() {
    api.getMe().then((user) => {
      this.setState({ user }, () => {
        console.log(user);
        api.getQuests(this.state.user.facebook_id).then((quests) => {
          this.setState({ quests });
        });
      });
    });

  }

///////////////////////////////
// REEEEENNNNNDDEEERRRRRRR
//////////////////////////////

  render() {
    var questList;
    var questForm;
    var waypointList;
    var waypointForm;
    if (this.state.quests) {
      questList = (
        <QuestList
          userId={this.state.user.facebook_id}
          quests={this.state.quests}
          currentQuest={this.state.currentQuest}
          setCurrentQuest={this.setCurrentQuest.bind(this)}
          newQuest={this.newQuest.bind(this)}
        />
      );

      questForm = (
        <QuestForm
          userId={this.state.user.facebook_id}
          quest={this.state.quests[this.state.index]}
          updateQuest={this.updateCurrentQuest.bind(this)}
          deleteQuest={this.deleteCurrentQuest.bind(this)}
        />
      );

      waypointList = (
         <WaypointList quest={this.state.quests[this.indexOfCurrentQuest()]} />
      );

      waypointForm = (
        <div></div>
      );


    } else {
      questList = <div />;
      questForm = <div />;
      waypointList = <div />;
      waypointForm = <div />;
    }

    return (
      <div className="container-fluid">
        <Nav user={this.state.user} />
        <div className="col-md-6">
          {questList}
          {questForm}
        </div>
        <div className = "col-md-6">
          {waypointList}
          {waypointForm}
        </div>
      </div>
    );
  }

  setCurrentQuest(id) {
    this.setState({currentQuest: id}, () => {
      console.log('the current selected quest is', this.state.currentQuest);
      this.setState({index: this.indexOfCurrentQuest()});
    });
  }

  newQuest() {

    // default values
    var newQuest = {
      title: 'Untitled Quest',
      description: 'Add a description here',
      length: '0 mi',
      estimatedTime: '99 hrs',
      facebookId: this.state.user.facebook_id
    };

    api.saveQuest(newQuest, 'POST').then((quest) => {
      var quests = this.state.quests.concat([quest]);
      this.setState({
        quests,
        currentQuest: quest.id
      });
    });

  }

  updateCurrentQuest(quest) {
    api.saveQuest(quest, 'PUT').then((quest) => {
      console.log('we just updated this quest!', quest);
      var quests = this.state.quests.map((item, index) => {
        if (index === this.indexOfCurrentQuest()) {
          return quest;
        } else {
          return item;
        }
      });
      this.setState({ quests });
    });


  }

  deleteCurrentQuest() {
    api.deleteQuest(this.state.currentQuest).then(() => {
      var quests = this.state.quests;
      quests.splice(this.indexOfCurrentQuest(), 1);
      this.setState({ quests });
      this.setCurrentQuest(this.state.quests[0].id);
      this.setState({index: 0});
    });

  }

  setCurrentWaypoint(id) {
    this.setState({currentWaypoint: id});
  }


  newWaypoint(waypoint) {
    api.saveWaypoint(waypoint, 'POST').then((waypoint) => {
      var quests = this.state.quests[this.indexOfCurrentQuest()].waypoints.push(waypoint);
      this.setState({
        quests,
        currentQuest: waypoint.id
      });
    });
  }

  updateCurrentWaypoint(waypoint) {
    api.saveWaypoint(waypoint, 'PUT').then((waypoint) => {
      var quests = this.state.quests.map((quest, index) => {
        if (index === this.indexOfCurrentQuest()) {
          quest.map((item, index, array) => {
            if (index === indexOfProperty(array, 'id', waypoint)) {
              return waypoint;
            } else {
              return item;
            }
          });
        }
      });
      this.setState({ quests });
    });
  }

  deleteCurrentWaypoint() {
    api.deleteWaypoint(this.state.currentWaypoint).then(() => {
      var questIndex = this.indexOfCurrentQuest();
      var waypointIndex = indexOfProperty(
        this.state.quests[questIndex].waypoints, 'id', this.state.currentWaypoint
      );
      var quests = this.state.quests[questIndex].waypoints.splice(waypointIndex, 1);
      this.setState({ quests });
    });
  }

  indexOfCurrentQuest() {
    if (this.state.currentQuest === null) {
      return 0;
    } else {
      return indexOfProperty(this.state.quests, 'id', this.state.currentQuest);
    }

  }
}

module.exports = Main;
