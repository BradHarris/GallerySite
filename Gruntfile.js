module.exports = function (grunt) {
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			options: {
				livereload: true,
				interval: 500
			},
			scripts: {
				files: ['client/**/*.js', 'public/styles/**/*', 'public/pages/*'],
			},
			express: {
				files:  [ 'server.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					nospawn: true // Without this option specified express won't be reloaded
				}
			}
		},

		express: {
			options: {
			// Override defaults here
			},
			dev: {
				options: {
					script: 'server.js'
				}
			}
		}
	});

	grunt.registerTask('workon', 'Start working on this project.', [
		'express:dev',
		'watch'
	]);
};