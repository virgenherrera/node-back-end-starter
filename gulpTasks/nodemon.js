"use strict";
const nodemon	= require('gulp-nodemon');

module.exports = ()=>{
	let stream = nodemon({
		script	: 'dist/Service',
		watch	: 'src',
		ext		: 'ts json',
		tasks	: ['build','watch'],
	});

	return stream;
};
