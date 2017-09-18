"use strict";
const Tasks			= require('./gulpTasks');
const gulp			= require('gulp');
const runSequence	= require('run-sequence');

/**
* Declare Single Tasks
*/
gulp.task('clean',Tasks.clean);
gulp.task('copySrcJson',Tasks.copySrcJson);
gulp.task('provideForeverJson',Tasks.provideForeverJson);
gulp.task('nodemon',Tasks.nodemon);
gulp.task('provideEnv',Tasks.provideEnv);
gulp.task('tsTranspile',Tasks.tsTranspile);
gulp.task('watch',Tasks.watch);

/**
* Declare bundle Tasks
*/
gulp.task('provision', cb => runSequence(['provideEnv','provideForeverJson'],cb) );
gulp.task('build', cb => runSequence(['clean','tsTranspile','copySrcJson'],cb) );
gulp.task('serve:dev',['build','watch'],Tasks.nodemon);
gulp.task('prepare:prod', cb => runSequence(['provideForeverJson','build'],cb));


/**
* Default Task
*/
gulp.task('default', ['serve:dev']);
