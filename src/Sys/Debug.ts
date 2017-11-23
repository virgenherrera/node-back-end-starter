export function dump(...args){
	console.log(`\n//*------- start Data dumping...`);
	for ( var arg in args ){
		// Notify about which arg are dumping
		console.info(`\n\t...for argument:{${arg}}\n`);
		//print type
		console.log(`Type: ${typeof arguments[arg]}`);
		// print length if exists
		if( arguments[arg] && Array.isArray(arguments[arg]) ){
			console.log(`Length: ${arguments[arg].length}`);
		}

		if( arguments[arg] && typeof arguments[arg] == 'object' && !Array.isArray(arguments[arg]) ){
			let keys = Object.keys( arguments[arg] ).join("','");
			if(keys)  console.log(`Keys: '${keys}'`);
		}
		// print Value
		if( typeof arguments[arg] === "string" || /^\d+$/.test( arguments[arg] ) ){
			console.log( 'Value: ', arguments[ arg ] );
		} else {
			console.log( 'Value: ');
			console.dir( arguments[ arg ] );
		}
	}
	console.log("\n\t\tData dump done! -------*//\n");
}

export function die(){
	console.trace();
	console.info("\n\n\nnow Process will die\n\n");
	process.exit();
}

export function dd(...args){
	dump.apply( this, args );
	die();
}
