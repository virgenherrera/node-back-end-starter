import Directories from './Directories';
import * as dotEnv from 'dotenv';

/**
* Loads Environment Variables from /.env file
*/
export default function loadEnvironmentVars(): void {
	if ( !Directories.fileExists('Base', '.env') ) {
		console.log('cannot to load "ENVIRONMENT" vars');
		console.log('please be sure to have a properly defined ".env" file at this project root');
		console.log(`must be placed in: "${Directories.getPathToFile('Base', '.env')}"`);
		console.log(`HINT: you can create one by typing one os the following commands:${'\n\t'}$ yarn provide-env${'\n\t'}$ npm run provide-env`);
		process.exit(1);
	}

	const { parsed } = dotEnv.config({
		path: Directories.getPathToFile('Base', '.env')
	});
	const validEnv = ['production', 'test', 'development'];

	if ( validEnv.indexOf( process.env.NODE_ENV ) === -1 ) {
		console.log('service can not be started because NODE_ENV was configured with an illegal value.');
		console.log(`declare NODE_ENV in your .env file or in the terminal with one of the following allowed values:${'\n'}${JSON.stringify(validEnv)}`);
		process.exit(1);
	}
}
