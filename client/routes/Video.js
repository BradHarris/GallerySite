var React = require('react'),
	Router = require('react-router');

var Video = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		var videoId = this.getParams().videoId;
		return (
			<p>Video {videoId}</p>
		);
	}
});

module.exports = Video;
