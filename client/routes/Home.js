var React = require('react'),
	Router = require('react-router'),
	Page = require('./Page');

var Home = React.createClass({
	render: function() {
		return (
			<Page page='home'/>
		);
	}
});

module.exports = Home;
