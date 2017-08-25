"use strict";
const gulp					= require('gulp');
const runSequence			= require('run-sequence').use(gulp);
const ts					= require('gulp-typescript');
const sourcemaps			= require('gulp-sourcemaps');
const { compilerOptions }	= require('../tsconfig');
const tsProject				= ts.createProject('tsconfig.json');
const Transpile = {
	withMaps	: ()=>{
		return tsProject.src()
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
		.js
		.pipe( sourcemaps.write(`../${compilerOptions.outDir}`) )
		.pipe( gulp.dest( compilerOptions.outDir ) );
	},
	withoutMaps	: ()=>{

		return tsProject.src()
		.pipe( tsProject() )
		.js
		.pipe( gulp.dest( compilerOptions.outDir ));
	},
};

module.exports = () => {
	let Method = ( (compilerOptions.sourceMap) ) ? 'withMaps' : 'withoutMaps';
	let stream = Transpile[Method]();

	return stream;
}
