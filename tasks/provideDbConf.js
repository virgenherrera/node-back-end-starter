"use strict";
const {
	copyFileSync,
	existsSync,
}	= require('fs');
const { join }			= require('path');
const { name } = require('../package.json');

	return (()=>{
		const origin			= join( __dirname , '../examples','dbConfig.example' );
		const destiny			= join( __dirname , '../persistance','config.js' );

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}file:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		copyFileSync(origin,destiny,{encoding:'utf-8'});
	}
})();
