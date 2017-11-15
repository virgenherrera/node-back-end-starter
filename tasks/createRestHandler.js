"use strict";
const {
	existsSync,
	appendFileSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join }			= require('path');
const getLastCliArg		= require('./lib/getLastCliArg');
const ucfirst			= require('./lib/ucfirst');
const moduleName		= getLastCliArg() || "handler" ;

return (()=>{
	const loaderFile		= join( __dirname , '../src/handler/index.ts' );
	const origin			= join( __dirname , '../examples/restHandler.example' );
	const destiny			= join(__dirname, `../src/handler/restful/${moduleName}.ts`);
	const fileContent		= readFileSync(origin,'utf-8');
	const lowerRegEx		= new RegExp("{{module}}","g");
	const CamelRegEx		= new RegExp("{{Module}}","g");
	const CamelName			= ucfirst(moduleName);
	const newContent		= fileContent.toString().replace(lowerRegEx, moduleName).replace(CamelRegEx,CamelName);
	const exportHandler		= `export { default as ${moduleName} }		from './Restful/${moduleName}';${"\n"}`;

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Handler:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		appendFileSync(loaderFile,exportHandler,{encoding:'utf-8'})
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
