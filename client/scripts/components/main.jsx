var React = require('react');
var Nav = require('./navbar.jsx');
var Sidebar = require('react-sidebar');
var Map = require('./map.jsx');
var QuestList = require('./questList.jsx');
var QuestForm = require('./questForm.jsx');
var WaypointList = require('./waypointList.jsx');
var WaypointForm = require('./waypointForm.jsx');
var api = require('../helpers/api.helper');
var _ = require('underscore');

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
      hideSearchInput: true,
      user: {
        facebook_id: null
      },
      quests: null,
      currentQuest: null,
      currentQuestTitle: null,
      currentWaypoint: null,
      index: 0,
      sidebarOpen: true,
      questFormOpen: false,
      waypointCreate: false,
      editQuestLink: {
        color: '#909090',
      },
    };
  }

  onSetSidebarOpen (open) {
    this.setState({sidebarOpen: open});
  }

  openQuestList() {
    this.setState({
      sidebarOpen: true,
      questFormOpen: false,
    });
  }

  closeQuestList() {
    this.setState({ sidebarOpen: false });
  }

  openQuestForm() {
    this.setState({ questFormOpen: true });
  }

  closeQuestForm() {
    this.setState({ questFormOpen: false });
  }

  componentWillMount() {

    api.getMe().then((user) => {
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
                currentQuest: quests[0].id,
                currentQuestTitle: quests[0].title,
                currentWaypoint: quests[0].waypoints[0].id
              });
            } else {
              this.setState({sidebarOpen: true});
            }
          });
        });
      });
    });
  }

  render() {
    var questList;
    var questForm;
    var waypointList;
    var waypointForm;
    var map;

    if (this.state.quests) {
      if (this.state.quests.length === 0) {
        questList = (
          <div style={styles.sidebarContent}>
            <p>You have not created any quests. Create a quest to get started.</p>
            <button className="ui green button" onClick={this.newQuest.bind(this)}>Create New Quest</button>
          </div>
        );
      } else {
        questList = (
          <div style={styles.sidebarContent}>
            <QuestList
              userId={this.state.user.facebook_id}
              quests={this.state.quests}
              setCurrentQuest={this.setCurrentQuest.bind(this)}
              deleteQuest={this.deleteCurrentQuest.bind(this)}
              currentQuest={this.state.currentQuest}
              onSetSidebarOpen={this.onSetSidebarOpen.bind(this)}
              closeQuestList={this.closeQuestList.bind(this)}
              newQuest={this.newQuest.bind(this)} />
          </div>
        );
      }


      var currentWaypoints;
      if (!this.state.quests.length) {
        currentWaypoints = null;
      } else {
        currentWaypoints = this.state.quests[this.indexOfCurrentQuest()].waypoints;
      }


      if (currentWaypoints && currentWaypoints.length) {
        waypointList = (
           <WaypointList
             quest={this.state.quests[this.indexOfCurrentQuest()]}
             setCurrentWaypoint={this.setCurrentWaypoint.bind(this)}
             currentWaypoint={this.state.currentWaypoint}
             waypointWillBeCreated={this.waypointWillBeCreated.bind(this)} />
        );

        waypointForm = (
          <WaypointForm
            waypoint={this.state.quests[this.indexOfCurrentQuest()].waypoints[this.indexOfCurrentWaypoint() || 0]}
            updateWaypoint={this.updateCurrentWaypoint.bind(this)}
            deleteWaypoint={this.deleteCurrentWaypoint.bind(this)} />
        );

        if (this.state.currentWaypoint !== null) {
          map = (
            <Map
              waypoints={this.state.quests[this.indexOfCurrentQuest()].waypoints || []}
              newWaypoint={this.newWaypoint.bind(this)}
              hideSearchInput={this.state.hideSearchInput}
              setCurrentWaypoint={this.setCurrentWaypoint.bind(this)}
              currentWaypoint={this.state.currentWaypoint}
              updateWaypoint={this.updateCurrentWaypoint.bind(this)}
              key={this.state.currentQuest} />
          );
        } else {
          map = <div />;
        }
      } else {
        waypointList = <div />;
        waypointForm = <div />;
        map = <div />;
      }
    }

    if (this.state.questFormOpen) {
      questForm = (
        <QuestForm
          userId={this.state.user.facebook_id}
          quest={this.state.quests[this.indexOfCurrentQuest()]}
          updateQuest={this.updateCurrentQuest.bind(this)}
          deleteQuest={this.deleteCurrentQuest.bind(this)}
          closeQuestForm={this.closeQuestForm.bind(this)} />
      );
    }

    var sidebarContent = (
      {questList}
    );

    return (
      <div>
        <Sidebar
          className="sidebar"
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen.bind(this)}>
          <div
            className="ui grid stackable">
            <div className="row">
              <Nav className="sixteen wide column"
                user={this.state.user}
                openQuestList={this.openQuestList.bind(this)} />
            </div>
            <div
              className="row"
              style={styles.contentPadding}>
              <div className="four wide column"></div>
              <div className="eight wide column" style={styles.title}>
                {this.state.currentQuestTitle}
                 <div
                  style={styles.questOptions} >
                   <a
                    onMouseOver={()=>{
                      this.setState({
                        editQuestLink: {
                          color: '#777777',
                          cursor: 'pointer',
                        }
                      });
                    }}
                    onMouseOut={()=>{
                      this.setState({
                        editQuestLink: {
                          color: '#909090',
                        }
                      });
                    }}
                    onClick={this.openQuestForm.bind(this)}
                    style={this.state.editQuestLink} >
                    Edit Quest
                   </a>
                 </div>
                {questForm}
              </div>
              <div>
                { this.state.waypointCreate ? <p>Click below to add waypoint</p> : null}
              </div>
              <div className="sixteen wide column">
              </div>
              <div className="four wide column" style={styles}>
                {waypointList}
              </div>
              <div className="mapDiv eight wide column" style={styles}>
                { this.state.waypointCreate ? <p style={styles.pContainer}><button className="ui button" onClick={this.cancelWaypoint.bind(this)} style={styles.cancelButton}>Cancel</button></p> : null}
                {map}
              </div>
              <div className="four wide column" style={styles}>
                {waypointForm}
              </div>
            </div>
          </div>
        </Sidebar>
      </div>

    );
  }

  setCurrentQuest(id) {
    this.setState({
      currentQuest: id,
    }, () => {
      this.setState({
        currentWaypoint: this.state.quests[this.indexOfCurrentQuest()].waypoints[0].id,
        currentQuestTitle: this.state.quests[this.indexOfCurrentQuest()].title
      });
    });
  }

  newQuest() {

    // default values
    var newQuest = {
      title: 'Untitled Quest',
      description: '',
      estimatedTime: '',
      facebookId: this.state.user.facebook_id,
    };

    api.saveQuest(newQuest, 'POST').then((quest) => {

      // quest.waypoints = [];
      if (!this.state.quests) {
        this.setState({
          quests: [quest]
        });
      } else {
        var quests = this.state.quests.concat([quest]);
        this.setState({
          quests,
          currentQuest: quest.id,
          currentQuestTitle: quest.title,
          questFormOpen: true,
          sidebarOpen: false,
          currentWaypoint: this.state.quests[this.state.quests.length - 1].waypoints[0].id,
        });
      }
    });

  }

  updateCurrentQuest(quest) {
    console.log('in updateCurrentQuest!');
    console.log(quest);
    api.saveQuest(quest, 'PUT').then((quest) => {
      var quests = this.state.quests.map((item, index) => {
        if (index === this.indexOfCurrentQuest()) {
          return quest;
        } else {
          return item;
        }
      });
      this.setState({
        quests,
        currentQuestTitle: quest.title,
        questFormOpen: false,
      });
    });
  }

  deleteCurrentQuest() {
    if (this.state.quests.length === 1) {
      return console.log('sorry, but you can\'t delete your only quest!');
    }

    var oldIndex = this.indexOfCurrentQuest();

    var newIndex;
    if (oldIndex === 0) {
      newIndex = 1;
    } else {
      newIndex = oldIndex - 1;
    }

    api.deleteQuest(this.state.quests[oldIndex].id).then(() => {
      var quests = this.state.quests.slice();
      quests.splice(oldIndex, 1);
      this.setState({
        quests,
        questFormOpen: false,
        currentQuest: this.state.quests[newIndex].id,
        currentQuestTitle: this.state.quests[newIndex].title,
        currentWaypoint: this.state.quests[newIndex].waypoints[0].id
      });
    });
  }

  setCurrentWaypoint(id) {
    this.setState({currentWaypoint: id});
  }

  waypointWillBeCreated() {
    this.setState({hideSearchInput: false});
    this.setState({waypointCreate: true});
    $('.mapDiv').dimBackground();
  }

  cancelWaypoint(){
    this.setState({waypointCreate: false});
    $('.mapDiv').undim();
  }

  newWaypoint(lat, lng) {

    var quests = _.clone(this.state.quests);
    var targetQuest = quests[this.indexOfCurrentQuest()];
    // this.state.quests
    var defaultWaypoint = {
        quest_id: this.state.currentQuest,
        index_in_quest: targetQuest.waypoints[targetQuest.waypoints.length - 1].index_in_quest + 1,
        title: 'Untitled Waypoint',
        description: '',
        latitude: lat,
        longitude: lng
    };

    api.saveWaypoint(defaultWaypoint, 'POST').then((waypoint) => {
      targetQuest.waypoints.push(waypoint);
      this.setState({
        quests,
        currentWaypoint: waypoint.id,
        hideSearchInput: true,
        waypointCreate: false
      });
    });
    this.setState({waypointCreate: false});
    $('.mapDiv').undim();
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
    if (this.state.quests[this.indexOfCurrentQuest()].waypoints.length === 1) {
      return console.log('sorry, but quests must have at least one waypoint!');
    }

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

var styles = {
  pContainer: {
    textAlign: 'right',
    marginBottom: 10,
  },
  cancelButton: {
    position: 'relative',
    right: -3,
  },
  contentPadding: {
    paddingLeft: 50,
    paddingRight: 50,
    // paddingTop: 20,
    paddingBottom: 50,
  },
  sidebarContent: {
    padding: 20,
    color: '#2A2A2A',
  },
  questOptions: {
    fontSize: 13,
    marginTop: 10,
  },
  title: {
    textAlign: 'left',
    fontSize: 26,
    marginBottom: 20,
    color: '#555555',
  },
  centered: {
    textAlign: 'center',
  }
};

module.exports = Main;
