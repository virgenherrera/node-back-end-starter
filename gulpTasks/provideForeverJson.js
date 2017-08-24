"use strict";
const path				= require('path');
const fs				= require('fs');
// const gulp				= require('gulp');
const {compilerOptions}	= require('../tsconfig');
require('dotenv').config({path: path.join(__dirname,'../.env')});

const projectDirName	= path.basename(path.resolve(__dirname,'../'));
const script			= `${compilerOptions.outDir}/service.js`;
const sourceDir			= path.join(__dirname,'../');
const destinationFilePath	= path.join(__dirname,'../forever.json');
const foreverConfig 	= JSON.stringify({
	"uid"		: process.env.SERVICE_NAME || projectDirName,
	"append"	: true,
	"watch"		: false,
	"script"	: script,
	"sourceDir"	: sourceDir,
	"logFile"	: path.join( sourceDir , "foreverLogs/forever.log" ),
	"outFile"	: path.join( sourceDir , "foreverLogs/out.log" ),
	"errFile"	: path.join( sourceDir , "foreverLogs/err.log" ),
},null,2);

module.exports = ()=>{
	return fs.writeFileSync( destinationFilePath , foreverConfig );
}

