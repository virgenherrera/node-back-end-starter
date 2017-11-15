"use strict";
module.exports = ()=>{
	let lastArg = process.argv.pop();

	if(__filename == lastArg){
		return null;
	} else {
		return lastArg
		.replace(/\W/g, '')
		.replace(/\d/g,'')
		.toLowerCase();
	}
}
