"use strict";
const {
	existsSync,
	writeFileSync,
	readFileSync
}	= require('fs');
const { join }			= require('path');
const ucfirst			= require('./lib/ucfirst');
const parseCliArgs		= require("./lib/parseCliArgs");
const interfaceCont		= (attr=null,type=null)=>{
	if(!attr || !type) return;
	return `	${attr}:${type};${"\n"}`;
}
const schemaAttrCont	= (attr=null,type=null)=>{
	if(!attr || !type) return;
	return `	${attr}			: {
		type		: ${ucfirst(type)},
		unique		: false,
		index		: false,
		lowercase	: false,
		uppercase	: false,
		required	: false,
		trim		: true,
		select		: true,
		// set			: (val)=>{/* setter func here! */},
		// get			: ()=>{/* getter func here! */},
		// validate	: {
		// 	validator: (val)=>{/* Validation func here! */},
		// 	message	: '{VALUE} is not a valid ${attr}!'
		// },
	},
`;
}

return (()=>{
	let {name=null,attributes=null} = parseCliArgs();
	let iContent = '';
	let schemaDefinition = '';
	const ModuleRegex		= new RegExp("{{Module}}","g");
	const iContRegex		= new RegExp("{{iCont}}","g");
	const schemaDefRegex	= new RegExp("{{schemaDef}}","g");
	const origin			= join( __dirname , '../examples/model.example' );
	const destiny			= join(__dirname, `../src/Model/${name}.ts`);
	const fileContent		= readFileSync(origin,'utf-8');

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
		iContent += interfaceCont(attr,type);
		schemaDefinition += schemaAttrCont(attr,type);
	});

	const newContent		= fileContent.toString().replace(ModuleRegex, ucfirst( name )).replace(iContRegex,iContent).replace(schemaDefRegex,schemaDefinition);

	if( existsSync( destiny ) ){
		console.error(`Cannot Overwrite!${"\n"}Handler:	${destiny}${"\n"}Already Exists`);
		process.exit(1);
	} else {
		writeFileSync(destiny,newContent,{encoding:'utf-8'});
	}
})();
