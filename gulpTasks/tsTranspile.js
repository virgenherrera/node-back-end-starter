"use strict";
const gulp					= require('gulp');
const ts					= require('gulp-typescript');
const sourcemaps			= require('gulp-sourcemaps');
const { compilerOptions }	= require('../tsconfig');
const tsProject				= ts.createProject('tsconfig.json');

module.exports = () => {
	if( (compilerOptions.sourceMap) ){
		// write sourcemaps if enabled on tsconfig
		const tsResult = tsProject.src()
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

		return tsResult.js
		.pipe( sourcemaps.write(`../${compilerOptions.outDir}`) )
		.pipe( gulp.dest( compilerOptions.outDir ) );
	} else {
		const tsResult = tsProject.src().pipe( tsProject() );
		return tsResult.js.pipe( gulp.dest( compilerOptions.outDir ));
	}
}
