"use strict";
const gulp = require('gulp');

module.exports = ()=>{
	return gulp.watch( ["../src/**/*.ts"] , ['copySrcJson','tsTranspile']);
}

