import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import acceptUrlencoded from '../Middleware/acceptUrlencoded';

/**
* The application's global middleware stack.
*
* These middleware are run during every request to your application.
*
* Add to this array all middlewares that you wish to use globally
*/

export const middleware = [
	logger('dev'),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: true }),
	cors(),
	acceptUrlencoded,
];
