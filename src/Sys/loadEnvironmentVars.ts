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
	let validEnv = ['production','test','development'];

	if( validEnv.indexOf( process.env.NODE_ENV ) == -1 ){
		console.error('service can not be started because NODE_ENV was configured with an illegal value.');
		console.info(`declare NODE_ENV in your .env file or in the terminal with one of the following allowed values:${"\n"}${JSON.stringify(validEnv)}`);
		process.exit(1);
	}
}
