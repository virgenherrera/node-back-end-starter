import Directories		from './Directories';
import * as dotEnv		from 'dotenv';

export interface iEnv{
	parsed		: Object;
	listLoadedEnv():void;
}

/**
* Load environment variables from .env file, where API keys and passwords are configured.
*/
export class getEnv implements iEnv{
	public parsed;

	constructor(){
		let { parsed } = dotEnv.config({
			path: Directories.getPathToFile('Base','.env')
		});

		this.parsed = parsed;
	}

	listLoadedEnv():void{
		let envParams = Object.keys( this.parsed ).join('; ');
		console.log(`Loaded environment vars: ${envParams}${"\n"}`);
	}
}

export default new getEnv;
