"use strict";
const {
	clean,
	copySrcJson,
	provideForeverJson,
	nodemon,
	provideEnv,
	tsTranspile,
	watch,
}					= require('./gulpTasks');
const gulp			= require('gulp');
const runSequence	= require('run-sequence');

/**
* Declare Single Tasks
*/
gulp.task('clean',clean);
gulp.task('copySrcJson',copySrcJson);
gulp.task('provideForeverJson',provideForeverJson);
gulp.task('nodemon',nodemon);
gulp.task('provideEnv',provideEnv);
gulp.task('tsTranspile',tsTranspile);
gulp.task('watch',watch);

/**
* Declare bundle Tasks
*/
gulp.task('provision',() => runSequence(['provideForeverJson','provideEnv']) );
gulp.task('build', cb => runSequence(['clean','tsTranspile','copySrcJson'],cb) );
gulp.task('serve:dev',['watch','build'],nodemon);
gulp.task('serve:prod',['provision','build']);


/**
* Default Task
*/
gulp.task('default', ['serve:dev']);
