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
      console.log(user);
      this.setState({ user }, () => {
        api.getQuests(this.state.user.facebook_id).then((quests) => {
          quests.forEach( (quest) => {
            if (!quest.waypoints) {
              quest.waypoints = [];
            }
          });
          this.setState({ quests }, () => {
            if (quests.length) {
              this.setState({
                currentQuest: quests[0].id
              });
            } else {

            }
          });
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
    var map;

    if (this.state.quests) {
      questList = (
        <QuestList
          userId={this.state.user.facebook_id}
          quests={this.state.quests}
          setCurrentQuest={this.setCurrentQuest.bind(this)}
          newQuest={this.newQuest.bind(this)}
        />
      );

      questForm = (
        <QuestForm
          userId={this.state.user.facebook_id}
          quest={this.state.quests[this.indexOfCurrentQuest()]}
          updateQuest={this.updateCurrentQuest.bind(this)}
          deleteQuest={this.deleteCurrentQuest.bind(this)}
        />
      );

      waypointList = (
         <WaypointList
           quest={this.state.quests[this.indexOfCurrentQuest()]}
           setCurrentWaypoint={this.setCurrentWaypoint.bind(this)}
           newWaypoint={this.newWaypoint.bind(this)}
        />
      );

      var currentWaypoints = this.state.quests[this.indexOfCurrentQuest()].waypoints;

      if (currentWaypoints && currentWaypoints.length) {
        waypointForm = (
          <WaypointForm
            waypoint={this.state.quests[this.indexOfCurrentQuest()].waypoints[this.indexOfCurrentWaypoint() || 0]}
            updateWaypoint={this.updateCurrentWaypoint.bind(this)}
            deleteWaypoint={this.deleteCurrentWaypoint.bind(this)}
          />
        );

        if (this.state.currentWaypoint !== null) {
          map = (
            <Map
              waypoints={this.state.quests[this.indexOfCurrentQuest()].waypoints}
              setCurrentWaypoint={this.setCurrentWaypoint.bind(this)}
              currentWaypoint={this.state.currentWaypoint}
              updateWaypoint={this.updateCurrentWaypoint.bind(this)}
              key={this.state.currentQuest}
            />
          );
        } else {
          map = <div />;
        }
      } else {
        waypointForm = (
          <div />
        );
        map = (
          <div />
        );
      }



    } else {
      questList = <div />;
      questForm = <div />;
      waypointList = <div />;
      waypointForm = <div />;
      map = <div />;
    }

    return (
      <div className="ui grid container">
            <div className="ui grid container">
              <Nav className="sixteen wide column" user={this.state.user} />
            </div>
            <div className="four wide column" style={mainStyle}>
              {questList}
              {questForm}
            </div>
            <div className="eight wide column" style={mainStyle}>
              {map}
            </div>
            <div className="four wide column" style={mainStyle}>
              {waypointList}
              {waypointForm}
            </div>
      </div>
    );
  }

  setCurrentQuest(id) {
    this.setState({
      currentQuest: id,
    }, () => {
      // this.setState({index: this.indexOfCurrentQuest()});
      this.setState({ currentWaypoint: this.state.quests[this.indexOfCurrentQuest()].waypoints[0].id });
    });
  }

  newQuest() {

    // default values
    var newQuest = {
      title: 'Untitled Quest',
      description: 'Add a description here',
      length: '0 mi',
      estimatedTime: '99 hrs',
      facebookId: this.state.user.facebook_id,
      waypoints: []
    };

    api.saveQuest(newQuest, 'POST').then((quest) => {
      quest.waypoints = [];
      var quests = this.state.quests.concat([quest]);
      this.setState({
        quests,
        currentQuest: quest.id
      });
    });

  }

  updateCurrentQuest(quest) {
    api.saveQuest(quest, 'PUT').then((quest) => {
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
    var context = this;
    api.deleteQuest(this.state.currentQuest).then(() => {
      var quests = context.state.quests;
      quests.splice(context.indexOfCurrentQuest(), 1);
      context.setState( {currentQuest: context.state.quests[0].id, index: 0}, () => {
        context.setState({quests});
      });
    });

  }

  setCurrentWaypoint(id) {
    this.setState({currentWaypoint: id});
  }


  newWaypoint() {
    var quests = this.state.quests.slice();
    var targetQuest = quests[this.indexOfCurrentQuest()];
    var defaultWaypoint = {
        quest_id: this.state.currentQuest,
        index_in_quest: targetQuest.waypoints.length,
        title: 'Untitled Waypoint',
        description: 'Add a description here',
        latitude: 37.783932,
        longitude: -122.409084
    };
    api.saveWaypoint(defaultWaypoint, 'POST').then((waypoint) => {
      targetQuest.waypoints.push(waypoint);
      this.setState({quests});
    });
  }

  updateCurrentWaypoint(waypoint) {
    waypoint.quest_id = waypoint.quest_id || this.state.currentQuest;
    waypoint.id = waypoint.id || this.state.currentWaypoint;

    var context = this;
    api.saveWaypoint(waypoint, 'PUT').then((waypoint) => {
      var quests = context.state.quests.slice();
      var questIndex = context.indexOfCurrentQuest();
      var quest = quests[questIndex];
      if (quest.waypoints && quest.waypoints.length > 0) {
        quests[questIndex].waypoints = quest.waypoints.map((item, index, array) => {
          if (index === indexOfProperty(array, 'id', waypoint.id)) {
            return waypoint;
          } else {
            return item;
          }
        });
      }
      this.setState({ quests });
    });

  }

  deleteCurrentWaypoint() {
    var context = this;
    api.deleteWaypoint(this.state.currentQuest, this.state.currentWaypoint).then(() => {
      var quests = context.state.quests.slice();
      var questIndex = context.indexOfCurrentQuest();
      var waypointIndex = indexOfProperty(quests[questIndex].waypoints, 'id', context.state.currentWaypoint);
      quests[questIndex].waypoints.splice(waypointIndex, 1);
      context.setState({ quests }, () => {
        if (quests[questIndex].waypoints && quests[questIndex].waypoints.length) {
          context.setCurrentWaypoint(context.state.quests[questIndex].waypoints[0].id);
        } else {
          context.setCurrentWaypoint(null);
        }
      });
    });
  }

  setCurrentQuestIndex(index) {
    this.setState({index});
  }

  indexOfCurrentQuest() {
    var index;
    if (this.state.currentQuest === null) {
      index = 0;
    } else {
      index = indexOfProperty(this.state.quests, 'id', this.state.currentQuest);
    }
    return index;
  }

  indexOfCurrentWaypoint() {
    if (this.indexOfCurrentQuest() === null || this.state.currentQuest === null || !this.state.quests[this.indexOfCurrentQuest()].waypoints) {
      return null;
    } else {
      var questIndex = indexOfProperty(this.state.quests, 'id', this.state.currentQuest);
      return indexOfProperty(this.state.quests[questIndex].waypoints, 'id', this.state.currentWaypoint);
    }

  }

}

 var mainStyle = {
  };

module.exports = Main;
