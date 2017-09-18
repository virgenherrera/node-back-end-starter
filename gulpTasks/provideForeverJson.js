"use strict";
require('ts-node').register({project: false, disableWarnings: true});
require('../src/Sys/getEnv.ts');
const dir					= new ( require('../src/Sys/Directories.ts').Directories );
const path					= require('path');
const fs					= require('fs');
const gulp					= require('gulp');
const jsonEditor			= require('gulp-json-editor');
const streamRename			= require('stream-rename');
const {compilerOptions}		= require( dir.getPathToFile('Base','tsconfig.json') );
const srcFile				= dir.getPathToFile('Examples','forever.example');
const foreverConfig 		= {
	"uid"		: process.env.SERVICE_NAME,
	"append"	: true,
	"watch"		: false,
	"sourceDir"	: dir.Base,
	"script"	: `${compilerOptions.outDir}/Service`,
	"logFile"	: dir.getPathToFile('Logs','forever.log'),
	"outFile"	: dir.getPathToFile('Logs','out.log'),
	"errFile"	: dir.getPathToFile('Logs','err.log'),
};

module.exports = ()=>{
	// return fs.writeFileSync( destinationFilePath , foreverConfig );
	return gulp.src( srcFile )
	.pipe( jsonEditor( foreverConfig ) )
	.pipe( streamRename({ extname: '.json' }) )
	.pipe( gulp.dest( dir.Base ) )
}
