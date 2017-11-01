'use strict';
const { join }				= require('path');
const { readFileSync,writeFileSync}	= require('fs');
const { compilerOptions }	= require('../tsconfig.json');
const { name,main }			= require('../package.json');
const dest = join(__dirname, '../forever.json');
const srcFile 				= JSON.parse(readFileSync( join(__dirname, '../examples/forever.example') ));

srcFile.uid			= name;
srcFile.script		= main;
srcFile.sourceDir	= join(__dirname,'../');
srcFile.logFile 	= join(__dirname,"../",srcFile.logFile);
srcFile.outFile 	= join(__dirname,"../",srcFile.outFile);
srcFile.errFile 	= join(__dirname,"../",srcFile.errFile);

return writeFileSync(dest, JSON.stringify(srcFile,null,2));
