import * as path		from "path";
import * as http		from 'http';
import * as debug		from 'debug';
import * as os			from 'os';
import App				from './application';

/**
* declare parent directory as basePath
*/
process.chdir( path.join( __dirname , '../' ) );

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
	let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
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
	let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
	let msg = `${process.env.NAME} is Listening on port: ${bind}`;

	debug(msg);
	console.log("\n"+msg);
	console.log('\tListening in the following local addresses:\n');

	// inform about localhost ip addresses
	let interfaces = os.networkInterfaces();
	for (let k in interfaces) {
		for (let k2 in interfaces[k]) {
			let address = interfaces[k][k2];

			if (address.family === 'IPv4' && !address.internal) {
				console.log(`http://${address.address}:${port}`);
			}
		}
	}
}
