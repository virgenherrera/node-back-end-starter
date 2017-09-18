"use strict";
const gulp					= require('gulp');
const JSON_FILES			= ['src/*.json', 'src/**/*.json'];
const {compilerOptions}		= require('../tsconfig');

module.exports = ()=>{
	let stream =  gulp.src(JSON_FILES)
	.pipe(gulp.dest( compilerOptions.outDir ));

	return stream;
}
