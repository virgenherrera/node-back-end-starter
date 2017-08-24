"use strict";
const gulp	= require('gulp');
const {
	copySrcJson,
	provideForeverJson,
	nodemon,
	provideEnv,
	tsTranspile,
}			= require('./gulpTasks');

/**
* Declare Single Tasks
*/
gulp.task('copySrcJson',copySrcJson);
gulp.task('provideForeverJson',provideForeverJson);
gulp.task('nodemon',nodemon);
gulp.task('provideEnv',provideEnv);
gulp.task('tsTranspile',tsTranspile);

/**
* Declare bundle Tasks
*/
gulp.task('provision',['provideForeverJson','provideEnv']);

gulp.task('watch', ['tsTranspile','copySrcJson'], () => {
	gulp.watch( ["src/**/*.ts"] , ['tsTranspile','copySrcJson']);
});


/**
* Default Task
*/
gulp.task('default', ['nodemon']);
