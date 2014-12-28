var React = require('react'),
	Router = require('react-router'),
	PaintingInfo = require('../components/PaintingInfo'),
	$ = require('jquery'),
	markdown = require('markdown').markdown;

var ScrollLockMixin = {
	scrollLock: function (elem) {
		elem = elem || this.getDOMNode();
		this.scrollElem = elem
		elem.addEventListener('wheel', this.onScrollHandler, false);
	},
	scrollRelease: function (elem) {
		elem = elem || this.scrollElem;
		elem.removeEventListener('wheel', this.onScrollHandler, false);
	},
	onScrollHandler: function (e) {
		var elem = this.scrollElem;
		var scrollTop = elem.scrollTop;
		var scrollHeight = elem.scrollHeight;
		var height = elem.clientHeight;
		var wheelDelta = e.deltaY;
		var isDeltaPositive = wheelDelta > 0;

		var cancelScrollEvent = function (e) {
			e.stopImmediatePropagation();
			e.preventDefault();
			e.returnValue = false;
			return false;
		};

		if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
			elem.scrollTop = scrollHeight;
			return cancelScrollEvent(e);
		}
		else if (!isDeltaPositive && -wheelDelta > scrollTop) {
			elem.scrollTop = 0;
			return cancelScrollEvent(e);
		}
	}
};

var Painting = React.createClass({
	mixins: [ Router.State, ScrollLockMixin ],
	getInitialState: function() {
		return { poem: '' };
	},
	componentDidMount: function() {
		$.get('/poems/' + this.props.title + '.txt', function(poem) {
			if(poem) {
				poem = markdown.toHTML(poem);
				this.setState({ poem: poem });
			}
		}.bind(this));

		this.scrollLock();
	},
	componentWillUnmount: function () {
		this.scrollRelease();
	},
	render: function() {
		return (
			<div className='painting'>
				<Router.Link className='closeButton' to="gallery" params={{galleryId: this.getParams().galleryId}}>x</Router.Link>
				
				<div className='container'>
					<img src={'/' + this.props.image} />
					<PaintingInfo {...this.props}/>
					<div className='poem'>
						{this.state.poem}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Painting