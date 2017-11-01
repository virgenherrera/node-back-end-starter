"use strict";
const {join}			= require('path');
const del				= require('del');
const {compilerOptions}	= require('../tsconfig');
const compiledPath		= join(__dirname,'../', compilerOptions.outDir );

return del.sync( compiledPath, {force:true} );
