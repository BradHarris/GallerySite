var gulp = require('gulp');
var babelify = require('babelify');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var chalk = require('chalk');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var watchify = require('watchify');
var minifyCSS = require('gulp-minify-css');
var duration = require('gulp-duration');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var COMMON = [
	'react',
	'react-router',
	'jquery'
];

var JS_DEST = 'public/scripts';
var CSS_DEST = 'public/styles';
var dev = false;

function doBundle(target, name) {
	return target.bundle()
		.on('error', function(e) {
			gutil.log('Browserify Error', e);
		})
		.pipe(source(name))
		.pipe(duration(chalk.cyan(name + ' built in')))
		.pipe(gulpif(!dev, streamify(uglify())))
		.pipe(gulp.dest(JS_DEST));
}

function watchBundle(target, name) {
	return watchify(target)
		.on('update', function (scriptIds) {
			scriptIds = scriptIds
				.filter(function(i) { return i.substr(0,2) !== './' })
				.map(function(i) { return chalk.blue(i.replace(__dirname, '')) });
			if (scriptIds.length > 1) {
				gutil.log(scriptIds.length + ' Scripts updated:\n* ' + scriptIds.join('\n* ') + '\nrebuilding...');
			} else {
				gutil.log(scriptIds[0] + ' updated, rebuilding...');
			}

			doBundle(target, name)
				.pipe(reload());
		})
}

function buildScripts() {
	function bundler(target, name) {
		if(dev) {
			watchBundle(target, name);
		}

		return doBundle(target, name);
	};

	var opts = dev ? watchify.args : {};
	opts.debug = !!dev;
	
	var main = browserify('./src/scripts/index.js', opts)
		.transform(babelify)
		.external(COMMON)

	var common = browserify({ debug: dev, noParse: COMMON }).require(COMMON);

	return merge(doBundle(common, 'common.js'), bundler(main, 'main.js'));
}

function buildLess() {
	return gulp.src('src/styles/*.less')
		.pipe(gulpif(dev, sourcemaps.init()))
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 5 versions', 'ie 9'],
			cascade: true
		}))
		.pipe(gulpif(dev, sourcemaps.write()))
		.pipe(duration(chalk.cyan('Stylesheets built in')))
		.pipe(gulpif(!dev, minifyCSS({ processImport: true, inliner: true })))
		.pipe(gulp.dest(CSS_DEST))
		.pipe(gulpif(dev, reload({ stream: true })));
}

gulp.task('clean', function(cb) {
	del(['public/styles', 'public/scripts'], cb);
});

function server() {
	browserSync({
		ui: {
			port: 8880
		},
		server: {
			baseDir: "./public",
			index: 'index.html',
		},
		port: 8888,
		browser: false,
		notify: false,
		middleware: [historyApiFallback]
	});
}

var historyApiFallback = require('connect-history-api-fallback');
gulp.task('default', ['dev']);
gulp.task('dev', function() {
	dev = true;

	server();

	gulp.watch(['src/styles/**/*.less'], buildLess);
	gulp.watch(['public/*.html'], reload);

	buildLess();
	buildScripts();
});

gulp.task('prod', function() {
	dev = false;
	process.env.NODE_ENV = 'production';

	buildLess();
	buildScripts();
	
	server();
});

gulp.task('build', ['clean'], function() {
	return merge(buildLess(), buildScripts())
		.pipe(duration(chalk.yellow('FINISHED!')))
});