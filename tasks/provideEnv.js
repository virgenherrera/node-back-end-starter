"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join }			= require('path');
const { name } = require('../package.json');

	return (()=>{
		const serviceNameRegEx	= new RegExp("{{SERVICE_NAME}}","g");
		const jwtSecretRegEx	= new RegExp("{{JWT_SECRET}}","g");
		const ServiceName		= name;
		const JwtSecret			= Math.random().toString(36).slice(2).toUpperCase();
		const origin			= join( __dirname , '../examples','.env.example' );
		const destiny			= join( __dirname , '../','.env' );
		const fileContent		= readFileSync(origin,'utf-8');
		const newContent		= fileContent
		.toString()
		.replace(serviceNameRegEx, ServiceName)
		.replace(jwtSecretRegEx,JwtSecret);

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Handler:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
