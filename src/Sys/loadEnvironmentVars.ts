import Directories		from './Directories';
import * as dotEnv		from 'dotenv';

/**
* Loads Environment Variables from /.env file
*/
export default function loadEnvironmentVars(): void {
	let { parsed } = dotEnv.config({
		path: Directories.getPathToFile('Base', '.env')
	});
}
