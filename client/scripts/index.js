var React = require('react'),
	Router = require('react-router');

var Header = React.createClass({
	render: function() {
		return (
			<div className="page-header">
				<h1>Lauralee K Harris</h1>
			</div>
		);
	}
});

var PageNav = React.createClass({
	render: function() {
		return (
			<div className="nav nav-pills">
				<Router.Link to="home">Home</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="page" params={{page:'artiststatement'}}>Artist Statement</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="gallery" params={{galleryId: 'all'}}>Gallery</Router.Link>
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />
				<PageNav />
				<Router.RouteHandler/>
			</div>
		);
	}
});

var routes = {
	Home: require('../routes/Home'),
	About: require('../routes/About'),
	Gallery: require('../routes/Gallery'),
	Painting: require('../routes/Painting'),
	Page: require('../routes/Page'),
	Pdf: require('../routes/Pdf')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home}/>

		<Router.Route name="gallery" path="/gallery/:galleryId" handler={routes.Gallery}>
			<Router.Route name="painting" path=":paintingId" handler={routes.Painting}/>
		</Router.Route>

		<Router.Route name="page" path="/page/:page" handler={routes.Page}/>

		<Router.Route name="pdf" path="/pdf/:pdfId" handler={routes.Pdf}/>

		<Router.DefaultRoute handler={routes.Home}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
