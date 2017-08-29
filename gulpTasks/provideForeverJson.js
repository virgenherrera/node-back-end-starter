"use strict";
const path				= require('path');
const fs				= require('fs');
// const gulp				= require('gulp');
const {compilerOptions}	= require('../tsconfig');
require('dotenv').config({path: path.join(__dirname,'../.env')});

const projectDirName	= path.basename(path.resolve(__dirname,'../'));
const script			= `${compilerOptions.outDir}/Service`;
const sourceDir			= path.join(__dirname,'../');
const destinationFilePath	= path.join(__dirname,'../forever.json');
const foreverConfig 	= JSON.stringify({
	"uid"		: process.env.SERVICE_NAME || projectDirName,
	"append"	: true,
	"watch"		: false,
	"script"	: script,
	"sourceDir"	: sourceDir,
	"logFile"	: path.join( sourceDir , "logs/forever.log" ),
	"outFile"	: path.join( sourceDir , "logs/out.log" ),
	"errFile"	: path.join( sourceDir , "logs/err.log" ),
},null,2);

module.exports = ()=>{
	return fs.writeFileSync( destinationFilePath , foreverConfig );
}

