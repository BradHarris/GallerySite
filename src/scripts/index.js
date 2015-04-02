var React = require('react');
var Router = require('react-router');

var App = require('./routes/App');
var Home = require('./routes/Home');
var Gallery = require('./routes/Gallery');
var Painting = require('./routes/Painting');
var Page = require('./routes/Page');
var Pdf = require('./routes/Pdf');
var Video = require('./routes/Video');

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={Home}/>

		<Router.Route name="gallery" path="/gallery/:galleryId" handler={Gallery} ignoreScrollBehavior>
			<Router.Route name="painting" path=":paintingId" handler={Painting}/>
		</Router.Route>

		<Router.Route name="page" path="/page/:page" handler={Page}/>

		<Router.Route name="pdf" path="/pdf/:pdfId" handler={Pdf}/>

		<Router.Route name="video" path="/video/:videoId" handler={Video}/>

		<Router.DefaultRoute handler={Home}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('content'));
});
