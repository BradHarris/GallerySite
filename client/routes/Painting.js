var React = require('react'),
	Router = require('react-router'),
	jquery = require('jquery'),
	ReactGallery = require('react-component-gallery');

var Painting = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		return (
			<div className='painting'>
				<img src={'/' + this.props.image} />
				<div className='info'>
					<div className='title'>{this.props.title}</div>
					<div className='media'>{this.props.media}</div>
					<div className='size'>{this.props.width} x {this.props.height}</div>
					<div className='price'>{this.props.price}</div>
				</div>
			</div>
		);
	}
});

module.exports = Painting