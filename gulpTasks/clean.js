"use strict";
const del	= require('del');
const {compilerOptions}	= require('../tsconfig');
const delPatterns = [ compilerOptions.outDir , 'foreverLogs/*.log' ];

module.exports = ()=>{
	return del.sync( delPatterns );
};
