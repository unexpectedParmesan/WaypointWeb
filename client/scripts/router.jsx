var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout.jsx');
var Main = require('./components/main.jsx');

var routes = (
	<Route name="layout" path="/" handler={Layout}>
		<DefaultRoute handler={Main} />
	</Route>
);

exports.start = function() {
  Router.run(routes, function (Handler) {
		React.render(<Handler />, document.getElementById('content'));
	});
};