var gulp = require('gulp'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-clean-css'),
	htmlmin = require('gulp-htmlmin'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;;

var path = {
	build: {
		html: 'build/',
		css: 'build/css/',
	},
	src: {
		html: 'src/index.html',
		style: 'src/style/main.scss',
	},
	watch: {
		html: 'src/**/*.html',
		style: 'src/style/**/*.scss',
		css: 'src/style/**/*.css',
	}

};

gulp.task('minify', () => {
  return gulp.src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html));
});


gulp.task('styles', function () {
	  gulp.src(path.src.style)
        .pipe(sass())
          .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});


 gulp.task('browser-sync', function () { 
	browserSync({ 
		server: { 
			baseDir: 'build'
		},
		notify: false 
	});
}); 
gulp.task('build', ['minify', 'styles', 'browser-sync']);

gulp.task('watch', function () {
	gulp.watch(path.watch.html, ['minify']);
	gulp.watch(path.watch.style, ['styles']);
	gulp.watch(path.watch.css, ['styles']);
	gulp.watch(path.watch.html, browserSync.reload);
	gulp.watch(path.watch.style, browserSync.reload);

});

gulp.task('default', ['build', 'watch']);
