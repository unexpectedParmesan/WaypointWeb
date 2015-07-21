var Reflux = require('reflux');

var Actions = Reflux.createActions([
  'authenticate',
  'login',
  'logout',
]);

module.exports = Actions;