var React = require('react');

var ContentFrame = React.createClass({
	render: function() {
		return <iframe src={this.props.contentSrc}/>;
	}
});

module.exports = ContentFrame