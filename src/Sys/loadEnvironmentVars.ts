import Directories		from './Directories';
import * as dotEnv		from 'dotenv';

/**
* Loads Environment Variables from /.env file
*/
export default function loadEnvironmentVars(): void {
	if( !Directories.fileExists('Base', '.env') ) {
		console.error('cannot to load "ENVIRONMENT" vars');
		console.info('please be sure to have a properly defined ".env" file at this project root');
		console.info(`must be placed in: "${Directories.getPathToFile('Base', '.env')}"`);
		console.info(`HINT: you can create one by typing one os the following commands:${"\n\t"}$ yarn provide-env${"\n\t"}$ npm run provide-env`);
		process.exit(1);
	}

	let { parsed } = dotEnv.config({
		path: Directories.getPathToFile('Base', '.env')
	});
}
