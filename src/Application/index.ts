import * as Express from 'express';
import * as moment from 'moment';
import * as favicon from 'serve-favicon';
import * as Handlers from '../config/handler';
import loadEnvironmentVars from '../Sys/loadEnvironmentVars';
import Directories from '../Sys/Directories';
import mongodbConnection from '../Sys/mongodbConnection';
import notFound from '../Middleware/notFound';
import { middleware } from '../config/middleware';

// Create and config a new expressJs web Application
class Application {

	public express: Express.Application;

	constructor() {
		/**
		* Be sure to execute this App with properly defined ENV
		*/
		loadEnvironmentVars();

		// Initialize Express js app
		this.express = Express();

		this
		.storageConnect()
		.middleware()
		.viewsConfig()
		.exposePubicPath()
		.exposeRoutes()
		.catch404();
	}

	middleware(): this {
		middleware.forEach(mid => {
			this.express.use( mid );
		});

		return this;
	}

	viewsConfig(): this {
		// view engine setup
		this.express.set('views', Directories.Views );
		this.express.set('view engine', 'pug');

		return this;
	}

	exposePubicPath(): this {
		this.express.use( Express.static( Directories.Public ) );

		return this;
	}

	exposeRoutes() {

		for ( const key in Handlers ) {
			if ( Handlers.hasOwnProperty(key) ) {
				const { name= null, path= null, router= null } = Handlers[key];

				if ( (name) && (path) && (router) ) {
					const pString = ( path.charAt(0) !== '/' ) ? `/${path}` : path;

					console.log(`exposing route: '${pString}'${'\n'}from:	'${key}' handler file${'\n'}`);
					this.express.use( pString , router );
				}
			}
		}

		return this;
	}

	catch404(): this {
		// catch 404 and handle it
		this.express.use( notFound );

		return this;
	}

	storageConnect(): this {
		mongodbConnection().then( msg => console.log(msg) );

		return this;
	}
}

const { express } = new Application;
export default express;
