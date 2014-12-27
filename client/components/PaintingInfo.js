var React = require('react');

var PaintingInfo = React.createClass({
	render: function() {
		var title = 'Untitled';
		if(this.props.title) {
			title = this.props.title;
		}

		var media = '';
		if(this.props.media) {
			media = this.props.media;
		}

		var size = ''
		if(this.props.width) {
			size = this.props.width + '" x ' + this.props.height + '"';
		}


		var price = (this.props.price || '').toString();
		if(this.props.price) {
			price = price.toLowerCase() === 'sold' ? 'Sold' : '$' + this.props.price;
		}

		return (
			<div className='info'>
				<div className='title'>{title}</div>
				<div className='media'>{media}</div>
				<div className='size'>{size}</div>
				<div className='price'>{price}</div>
			</div>
		);
	}
});

module.exports = PaintingInfo