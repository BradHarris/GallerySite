var React = require('react'),
	Router = require('react-router'),
	ContentFrame = require('../components/ContentFrame');

var PDF = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		var pdfId = '/pdf/' + this.getParams().pdfId + '.pdf';

		return (
			<ContentFrame contentSrc={pdfId} />
		);
	}
});

module.exports = PDF;
