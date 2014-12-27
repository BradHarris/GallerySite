var React = require('react'),
	Router = require('react-router'),
	jquery = require('jquery'),
	markdown = require('markdown').markdown;


var Page = React.createClass({
	mixins: [ Router.State ],
	getInitialState: function() {
		return { content: [] };
	},
	getPageContent: function() {
		var page = this.getParams().page || this.props.page;
		if(page) {
			jquery.get('/pages/' + page, function(content) {
				if(content) {
					content = markdown.toHTML(content);
					this.setState({ content: content || '' });
				}
			}.bind(this));
		}
	},
	componentDidMount: function() {
		this.getPageContent();
	},
	componentWillReceiveProps: function() {
		this.getPageContent();
	},
	render: function() {
		return (
			<div className='page'>
				<div dangerouslySetInnerHTML={{__html: this.state.content}} />
			</div>
		);
	}
});

module.exports = Page;
