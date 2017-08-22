"use strict";
const nodemon				= require('gulp-nodemon');
const {compilerOptions}		= require('../tsconfig');

module.exports = ()=>{
	let stream = nodemon({
		script: `${compilerOptions.outDir}/service.js`,
		watch: "src",
		tasks: ["tsTranspile","provideJson"],
		env: { "DEBUG": "Application,Request,Response" }
	});
	return stream;
};
