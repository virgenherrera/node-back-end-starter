"use strict";
const gulp					= require('gulp');
const JSON_FILES			= ['src/*.json', 'src/**/*.json'];
const {compilerOptions}		= require('../tsconfig');

module.exports = ()=>{
	return gulp.src(JSON_FILES)
	.pipe(gulp.dest( compilerOptions.outDir ));
}
