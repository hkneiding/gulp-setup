// initialise modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()

// path variables
const files = {
	scssPath: 'src/scss/**/*.scss',
	jsPath: 'src/js/**/*.js',
	htmlPath: 'src/**/*.html'
}

function scssTask() {
	return gulp.src(files.scssPath)
		.pipe(sass())
		.pipe(gulp.dest('./src/css'))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
};

function jsTask(){
    return gulp.src([files.jsPath     
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
}

function htmlTask(){
    return gulp.src([files.htmlPath     
        ])
		.pipe(gulp.dest('./dist/html'))

}

function watch() {
	browserSync.init({
		server: {
			baseDir: './src/',
			directory: true
		}
	});
	gulp.watch(files.scssPath, scssTask);
	gulp.watch(files.jsPath, jsTask);
	gulp.watch(files.htmlPath, htmlTask)
	gulp.watch(files.jsPath).on('change', browserSync.reload);
	gulp.watch(files.htmlPath).on('change', browserSync.reload);
	
}

exports.scssTask = scssTask;
exports.watch = watch;

exports.default = gulp.series(
	watch
)
