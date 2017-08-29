import Directories		from './Directories';
import * as dotEnv		from 'dotenv';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
export default dotEnv.config({
	path: Directories.getPathToFile('Base','.env')
});
