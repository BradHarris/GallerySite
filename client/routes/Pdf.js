var React = require('react'),
	Router = require('react-router');

var PDF = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		var pdfId = this.getParams().pdfId;
		return (
			<p>PDF {pdfId}</p>
		);
	}
});

module.exports = PDF;
