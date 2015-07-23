var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'authenticate',
  'login',
  'logout',
  'getUserData'
]);

module.exports = Actions;