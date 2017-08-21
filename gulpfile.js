"use strict";
const gulp			= require('gulp');
const JSON_FILES	= ['src/*.json', 'src/**/*.json'];
const tsTranspile	= require('./gulpTasks/tsTranspile');

gulp.task('tsTranspile',tsTranspile);

gulp.task('watch', ['tsTranspile'], () => {
	gulp.watch('src/**/*.ts', ['tsTranspile']);
});

gulp.task('assets', function() {
	return gulp.src(JSON_FILES)
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'assets']);
