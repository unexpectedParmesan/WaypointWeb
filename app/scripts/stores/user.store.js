var Reflux = require('reflux');
var Actions = require('../actions/actions');

var userStore = Reflux.createStore({
  listenables: [Actions],

  init: function() {
    this.userId = null;
  },

  checkUser: function(id) {
  },

  onLogin: function(id){
    console.log(id);
    this.userId = id;
    this.trigger(this.userId); 
  },

  getDefaultData: function(){
    return {
      userId: this.userId
    };
  },

});

module.exports = userStore;