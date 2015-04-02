var React = require('react');
var Router = require('react-router');
var NavBar = require('../components/Navbar');

var App = React.createClass({
	render: function() {
		return (
			<div style={{'height' : '100%;'}}>
				<NavBar />
				<div className='content'>
					<Router.RouteHandler/>
				</div>
			</div>
		);
	}
});

module.exports = App;