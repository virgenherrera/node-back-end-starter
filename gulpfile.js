"use strict";
const gulp			= require('gulp');
const tsTranspile	= require('./gulpTasks/tsTranspile');
const provideJson	= require('./gulpTasks/provideJson');
const nodemon		= require('./gulpTasks/nodemon');

gulp.task('tsTranspile',tsTranspile);
gulp.task('provideJson',provideJson);
gulp.task('nodemon',nodemon);

gulp.task('watch', ['tsTranspile'], () => {
	gulp.watch('src/**/*.ts', ['tsTranspile']);
});

gulp.task('default', ['watch', 'provideJson','nodemon']);
