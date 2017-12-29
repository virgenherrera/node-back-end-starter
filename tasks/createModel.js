"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join }			= require('path');
const pluralize = require('pluralize');
const ucfirst			= require('./lib/ucfirst');
const parseCliArgs		= require("./lib/parseCliArgs");
const scopeIncl = (attr = null) => {
	if( !attr ) return;
	return ` '${attr}',`;
};
const attribDeclaration =(attr = null,type = null) => {
	if( !attr || !type ) return;
	if( type == 'date' ) type = ucfirst(type);
	return `${'\t'}@Column${'\n\t'}${attr}: ${type};${'\n\n'}`;
};

return (()=>{
	let {name=null,attributes=null} = parseCliArgs();
	let scopeAttribs = '';
	let attribDefinition = '';
	const tableNameRegex = new RegExp('{{tableName}}','g');
	const ModuleRegex = new RegExp('{{Module}}','g');
	const attributesArrRegex = new RegExp('{{attributesArr}}','g');
	const attrDeclarationsRegex = new RegExp('{{attrDeclarations}}','g');
	const origin = join( __dirname , '../examples/model.example' );
	const destiny = join(__dirname, `../src/Model/${ucfirst(name)}.ts`);
	const fileContent = readFileSync(origin,'utf-8');

	if( !name ){
		console.error(`Cannot create unnamed model`);
		process.exit(1);
	}
	if(!attributes){
		attributes = [
			['demoAttr1',"string"],
			['demoAttr2',"string"],
			['demoAttr3',"string"],
		];
	}

	attributes.forEach(row=>{
		let [ attr=null,type=null ] = row;

		scopeAttribs += scopeIncl(attr);
		attribDefinition += attribDeclaration( attr, type );
	});

	const newContent		= fileContent
	.toString()
	.replace(tableNameRegex, pluralize( name ))
	.replace(ModuleRegex, ucfirst(name))
	.replace(attributesArrRegex, `${scopeAttribs} `)
	.replace(attrDeclarationsRegex, attribDefinition);


	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Model:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
