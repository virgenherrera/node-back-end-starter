import * as http		from 'http';
import * as debug		from 'debug';
import * as os			from 'os';
import * as dotEnv		from 'dotenv';
import Directories		from '../Sys/Directories';
import loadEnvironmentVars			from '../Sys/loadEnvironmentVars';
import Debug			from '../Sys/Debug';
import App				from '../Application';

/**
* Load Environment Variables from .env
*/
loadEnvironmentVars();

/**
* declare parent directory as basePath
*/
process.chdir( Directories.Cwd );

/**
* declare Service PORT
*/
const port = normalizePort(process.env.SERVICE_PORT);

/**
* init Debugger
*/
debug(`${process.env.SERVICE_NAME}:server`);

/**
* Get port from environment and store in Express.
*/
App.set('port', port);

/**
* Create HTTP server.
*/
const server = http.createServer(App);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
* Normalize a port into a number, string, or false.
*/
function normalizePort(val: number|string): number|string|boolean {
	let port: number = Number(val);
	if (isNaN(port)) return val;
	else if (port >= 0) return port;
	else return false;
}

/**
* Event listener for HTTP server "error" event.
*/
function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') throw error;
	let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
	switch(error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
		process.exit(1);
		break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
		process.exit(1);
		break;
		default:
			throw error;
	}
}

/**
* Event listener for HTTP server "listening" event.
*/
function onListening(): void {
	let addr = server.address();
	let bind = (typeof addr === 'string') ? `pipe: "${addr}"` : `port: "${addr.port}"`;
	let msg = `"${process.env.SERVICE_NAME}" is running on ${bind} in "${process.env.NODE_ENV}" mode`;

	debug(msg);
	console.log(msg);
	console.log(`	Listening in the following local addresses:`);

	// inform about localhost ip addresses
	let interfaces = os.networkInterfaces();
	for (let k in interfaces) {
		for (let k2 in interfaces[k]) {
			let address = interfaces[k][k2];

			if (address.family === 'IPv4' && !address.internal) {
				console.log(`* http://${address.address}:${port}`);
			}
		}
	}
}

