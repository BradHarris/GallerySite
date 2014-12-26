var React = require('react'),
	Router = require('react-router'),
	jquery = require('jquery'),
	ReactGallery = require('react-component-gallery');

var Thumb = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		var params = {
			galleryId: this.getParams().galleryId,
			paintingId: this.props.id
		};
		return (
			<Router.Link to='painting' maintainScrollPosition={true} params={params}>
				<div className='thumbnail'>
					<img src={'/' + this.props.thumb} />
					<span>{this.props.title}</span>
				</div>
			</Router.Link>
		);
	}
});

var Gallery = React.createClass({
	mixins: [ Router.State ],
	getInitialState: function() {
		return { galleries: [] };
	},
	componentDidMount: function() {
		jquery.getJSON('/data/gallery.json', function(data) {
			data = data || {};
			this.setState({ galleries: data.Gallery || [] });
		}.bind(this));
	},
	render: function() {
		var galleryId = this.getParams().galleryId;
		var paintingId = this.getParams().paintingId;
		var thumbnails = [];
		var ids = {};

		if(galleryId && galleryId !== 'all') {
			for(var i = 0; i < this.state.galleries.length; i++) {
				if(this.state.galleries[i].id === galleryId) {
					thumbnails = this.state.galleries[i].painting;
					for(var j = 0; j < this.state.galleries[i].painting.length; j++) {
						var p = this.state.galleries[i].painting[j];
						if(!ids[p.id]) {
							ids[p.id] = p;
						} else {
							console.log(p);
						}
					}
					break;
				}
			}
		} else {
			for(var i = 0; i < this.state.galleries.length; i++) {
				thumbnails = thumbnails.concat(this.state.galleries[i].painting);
				for(var j = 0; j < this.state.galleries[i].painting.length; j++) {
					var p = this.state.galleries[i].painting[j];
					if(!ids[p.id]) {
						ids[p.id] = p;
					} else {
						console.log(p);
					}
				}
			}
		}

		thumbnails = thumbnails.map(function(painting) {
			return (
				<Thumb key={painting.id} {...painting}/>
			);
		});

		if(paintingId) {
			var painting = ids[paintingId];
		}

		return (
			<div>

				<Router.RouteHandler {...painting}/>
				<ReactGallery margin='30' widthHeightRatio='1' targetWidth='200'>
					{thumbnails}
				</ReactGallery>
			</div>
		);
	}
});

module.exports = Gallery;
