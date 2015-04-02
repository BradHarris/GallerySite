var React = require('react');
var Router = require('react-router');
var Page = require('./Page');

var Home = React.createClass({
	render: function() {
		return (
			<Page page='home'/>
		);
	}
});

module.exports = Home;
