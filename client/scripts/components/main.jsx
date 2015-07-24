'use strict';

var React = require('react');
// var Reflux = require('reflux');
// var Actions = require('../actions/actions');
// var User = require('../stores/user.store');
var QuestForm = require('./questForm.jsx');
var QuestList = require('./questList.jsx');
var Nav = require('./navbar.jsx');
var api = require('../helpers/api.helper');

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
    };
  }

  componentDidMount() {
    api.getMe().then((user) => {
      this.setState({ user }, () => {
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
          quest={this.state.quests[this.indexOfCurrentQuest()]}
          updateQuest={this.updateCurrentQuest.bind(this)}
          deleteQuest={this.deleteCurrentQuest.bind(this)}
        />
    );

    } else {
      questList = <div />;
      questForm = <div />;
    }



    return (
      <div>
        <Nav user={this.state.user} />
        {questList}
        {questForm}
      </div>
    );
  }

  setCurrentQuest(id) {
    this.setState({currentQuest: id}, function() {
      console.log('the current selected quest is', this.state.currentQuest);
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
        }
      });
      this.setState({ quests });
    });


  }

  deleteCurrentQuest() {
    api.deleteQuest(this.state.currentQuest).then(() => {
      var quests = this.state.quests.splice(this.indexOfCurrentQuest(), 1);
      this.setState({ quests });
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
