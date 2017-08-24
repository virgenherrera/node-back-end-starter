"use strict";
const path			= require('path');
const gulp			= require('gulp');
const rename		= require('gulp-rename');
const envExPath		= path.join( __dirname , '../.env.example' );
const projPath		= path.join( __dirname , '../' );

module.exports = ()=>{
	return gulp.src( envExPath )
	.pipe( rename( '.env' ) )
	.pipe( gulp.dest( projPath ) );
}
