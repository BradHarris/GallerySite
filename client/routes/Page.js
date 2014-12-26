var React = require('react'),
	Router = require('react-router'),
	jquery = require('jquery');


var Page = React.createClass({
	mixins: [ Router.State ],
	getInitialState: function() {
		return { content: [] };
	},
	componentDidMount: function() {
		var page = this.getParams().page;
		if(page) {
			jquery.get('/pages/' + page, function(content) {
				this.setState({ content: content || '' });
			}.bind(this));
		}
	},
	render: function() {
		var page = this.getParams().page;
		return (
			<div>
				Page {page}
				<div>
					{this.state.content}
				</div>
			</div>
		);
	}
});

module.exports = Page;
