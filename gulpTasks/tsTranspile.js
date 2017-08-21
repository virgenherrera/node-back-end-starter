"use strict";
const gulp			= require('gulp');
const ts			= require('gulp-typescript');
const tsProject		= ts.createProject('tsconfig.json');
const { compilerOptions } = tsProject.config;

module.exports = () => {
	const tsResult = tsProject.src().pipe( tsProject() );
	return tsResult.js.pipe( gulp.dest( compilerOptions.outDir ));
}
