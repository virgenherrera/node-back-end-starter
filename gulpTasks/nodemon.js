"use strict";
const nodemon	= require('gulp-nodemon');

module.exports = ()=>{
	let stream = nodemon({
		script	: 'dist/service.js',
		watch	: 'src',
		ext		: 'ts json',
	})
	.on('change', ['serve:dev'])

	return stream;
};
