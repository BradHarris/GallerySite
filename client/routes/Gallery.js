var React = require('react'),
	Router = require('react-router'),
	ReactGallery = require('react-component-gallery'),
	PaintingInfo = require('../components/PaintingInfo'),
	slugify = require('slugify'),
	$ = require('jquery'),
	_ = require('lodash');

var Thumb = React.createClass({
	mixins: [ Router.State ],
	render: function() {
		var params = {
			galleryId: this.getParams().galleryId,
			paintingId: this.props.slug
		};

		return (
			<Router.Link to='painting' params={params}>
				<div className='thumbnail'>
					<img src={'/' + this.props.thumb} />
					<PaintingInfo {...this.props}/>
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
		$.getJSON('/data/gallery.json', function(data) {
			data = data || {};
			data = data.Gallery || [];

			this.setState({ galleries: data });
		}.bind(this));
	},
	render: function() {
		var galleryId = this.getParams().galleryId;
		var paintingId = (this.getParams().paintingId || '').toLowerCase();
		var paintings = [];
		var slugs = {};

		var SeriesLinks = [<Router.Link key='all' to="gallery" params={{galleryId: 'all' }}>All</Router.Link>];
		var SeriesStatement = this.state.SeriesStatement || '';

		for(var i = 0; i < this.state.galleries.length; i++) {
			SeriesLinks.push(
				<Router.Link key={this.state.galleries[i].id} to="gallery" params={{galleryId: this.state.galleries[i].id }}>{this.state.galleries[i].id}</Router.Link>
			)
		}

		var SeriesTitle = 'All Paintings';
		if(galleryId && galleryId !== 'all') {
			var gallery = _.find(this.state.galleries, {id: galleryId}) || {};
			paintings = gallery.painting || [];
			SeriesTitle = gallery.name;
		} else {
			for(var i = 0; i < this.state.galleries.length; i++) {
				paintings = paintings.concat(this.state.galleries[i].painting);
			}
		}

		for(var i = 0; i < paintings.length; i++) {
			if(paintings[i].title) {
				paintings[i].slug = slugify(paintings[i].title.toString()).toLowerCase(); 
			}
		}

		var Thumbs = paintings.map(function(painting) {
			return (
				<Thumb key={painting.slug} {...painting}/>
			);
		});

		slugs = _.indexBy(paintings, 'slug');
		if(paintingId) {
			var painting = slugs[paintingId];

		}

		return (
			<div className='gallery'>
				<Router.RouteHandler {...painting}/>
				<div className='seriesLinks'>
					{SeriesLinks}
				</div>
				<div className='seriesTitle'>
					{SeriesTitle}
				</div>
				<ReactGallery margin='10' widthHeightRatio='1' targetWidth='250'>
					{Thumbs}
				</ReactGallery>
				{SeriesStatement}
			</div>
		);
	}
});

module.exports = Gallery;
