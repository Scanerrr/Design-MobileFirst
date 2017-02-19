"use strict";

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		prefix = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync');

/*
* Change directories here
*/
var settings = {
	publicDir: '',
	layoutDir: 'pug',
  partialsDir: 'pug/layouts',
  sassDir: 'assets/css/sass',
  cssDir: 'assets/css'
};

/**
 * Compile .jade files and pass in data from json file
 * matching file name. index.`jade` - index.jade.json
 */
gulp.task('pug', function () {
	return gulp.src(settings.layoutDir + "/*.pug")
        .pipe(pug({
            pretty: true,
						basedir: __dirname
        }))
        .pipe(gulp.dest(settings.publicDir))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Wait for jade and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'pug'], function () {
	browserSync({
		server: {
			baseDir: settings.publicDir
		},
		notify: false
	});
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
	return gulp.src(settings.sassDir + '/*.sass')
		.pipe(sass({
			includePaths: [settings.sassDir],
			onError: browserSync.notify
		}))
		.on('error', sass.logError)
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest(settings.cssDir))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * Watch scss files for changes & recompile
 * Watch .jade files run jade-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch(settings.sassDir + '/**', ['sass']);
	gulp.watch(['*.pug', '**/*.pug'], ['pug']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);
