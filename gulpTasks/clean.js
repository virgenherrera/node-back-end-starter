"use strict";
const del	= require('del');
const {compilerOptions}	= require('../tsconfig');
const delPatterns = [ `../${compilerOptions.outDir}` , 'logs/*.log' ];

module.exports = ()=>{
	return del.sync( delPatterns, {force:true} );
};
