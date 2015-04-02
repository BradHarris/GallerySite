var React = require('react');
var Router = require('react-router');
var $ = require('jquery');

var NavBar = React.createClass({
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

		var SeriesLinks = [
			<li key='all'>
				<Router.Link to="gallery" params={{galleryId: 'all' }}>All</Router.Link>
			</li>
		];

		for(var i = 0; i < this.state.galleries.length; i++) {
			var label = this.state.galleries[i].id + ' - ' + this.state.galleries[i].name
			SeriesLinks.push(
				<li key={this.state.galleries[i].id}>
					<Router.Link to="gallery" params={{galleryId: this.state.galleries[i].id }}>{label}</Router.Link>
				</li>
			)
		}

		return (
			<div className="navbar">
				<span className='title'>Lauralee K Harris</span>

				<span className='menu'>
					<ul>
						<li>
							<Router.Link to="home">Home</Router.Link>
						</li>
						<li>
							<a href='#'>Gallery</a>
							<ul>
								{SeriesLinks}
							</ul>
						</li>
						<li>
							<Router.Link to="page" params={{page:'artiststatement'}}>Artist</Router.Link>
							<ul>
								<li>
									<Router.Link to="page" params={{page:'artiststatement'}}>Artist Statement</Router.Link>
								</li>
								<li>
									<Router.Link to="page" params={{page:'artistbiography'}}>Bio</Router.Link>
								</li>
								<li>
									<Router.Link to="pdf" params={{pdfId:'Resume'}}>CV & Exhibits</Router.Link>
								</li>
							</ul>
						</li>
						<li>
							<Router.Link to="page" params={{page:'reviews'}}>The Work</Router.Link>
							<ul>
								<li>
									<Router.Link to="page" params={{page:'reviews'}}>News, Reviews, and Commentary</Router.Link>
								</li>
								<li>
									<Router.Link to="page" params={{page:'students'}}>Students and Schools Who Have Studied My Work</Router.Link>
								</li>
								<li>
									<Router.Link to="video" params={{videoId:'Resume.pdf'}}>Documentary - From the Spirit - Season III (earth magic media) - Part 1</Router.Link>
								</li>
								<li>
									<Router.Link to="video" params={{videoId:'Resume.pdf'}}>Documentary - From the Spirit - Season III (earth magic media) - Part 2</Router.Link>
								</li>
								<li>
									<Router.Link to="pdf" params={{pdfId:'forteriecommission'}}>Fort Erie Peace Bridge Commission</Router.Link>
								</li>
								<li>
									<Router.Link to="pdf" params={{pdfId:'A Ceremony of Creating From the Creation of Life'}}>A Ceremony of Creating From the Creation of Life</Router.Link>
								</li>
								<li>
									<Router.Link to="page" params={{page:'booksandprints'}}>Books and Prints</Router.Link>
								</li>
							</ul>
						</li>
						<li>
							<a href='http://www.guestbookcentral.com/guestbook.cfm?Guestbook=7584' target='_blank'>Guestbook</a>
						</li>
						<li>
							<Router.Link to="page" params={{page:'links'}}>Links</Router.Link>
						</li>
					</ul>
				</span>
			</div>
		);
	}
});

module.exports = NavBar;