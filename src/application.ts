import * as Express			from 'express';
import * as logger			from 'morgan';
import * as bodyParser		from 'body-parser';
import * as cors			from 'cors';
import * as moment			from 'moment';
import * as routesConfig	from './Routes';
import sys					from './Lib/System';
import acceptUrlencoded		from './Middleware/acceptUrlencoded';
import notFound				from './Middleware/notFound';

/**
* First line on Console
*/
console.log(`
\\\\***************************************************************************************//
		Starting ${process.env.NAME}:server in "${process.env.NODE_ENV}" mode!
		date: ${moment().format('LLLL')}
\\\\***************************************************************************************//
`);

// Create and config a new expressJs web Application
class Application{

	public express: Express.Application;

	constructor(){
		this.express = Express();

		this
		.middleware()
		// .viewsConfig()
		// .exposePubicPath()
		.exposeRoutes()
		.catch404();
	}

	get getRoutes():Object{
		// const routesConfig = Routes;
		let res = {};

		for(let key in routesConfig ){
			let routerPath		= sys.getDir('route',routesConfig[key]);
			let routerExists	= sys.fileExists(`${routerPath}.js`);
			let router			= routerExists ? require( routerPath ) : false;
			let resKey			= '/';
			resKey += ( key == 'default' ) ? '' : key;

			res[ resKey ] = {
				name: key,
				path: routesConfig[key],
				router: router,
			};
		}

		return res;
	}

	middleware():this{
		// this.express.use( favicon( sys.getDir('public','favicon.ico') );
		this.express.use( logger('dev') );
		this.express.use( bodyParser.json() );
		this.express.use( bodyParser.urlencoded({ extended: true }) );
		this.express.use( cors() );
		this.express.use( acceptUrlencoded );

		return this;
	}

	viewsConfig():this{
		// view engine setup
		this.express.set('views', sys.dir.view );
		this.express.set('view engine', 'pug');

		return this;
	}

	exposePubicPath():this{
		this.express.use( Express.static( sys.dir.public ) );

		return this;
	}

	exposeRoutes():this{
		const loadedRouters = this.getRoutes;
		for( let key in loadedRouters ){
			if( process.env.NODE_ENV != 'production' ){
				if( loadedRouters[key].router )
					console.log(`exposing route: "${key}"${'\t'}from: "${loadedRouters[key].path}" router file`);
			}

			if( !loadedRouters[key].router ){
				console.error(`WARNING: The router named: "${loadedRouters[key].name}" does not exist in the path "${loadedRouters[key].path}" please check the file "/config/routes.js"`);
			} else {
				this.express.use( key , loadedRouters[key].router );
			}
		}

		return this;
	}

	catch404():this{
		// catch 404 and handle it
		this.express.use( notFound );

		return this;
	}
}

let {express} = new Application;
export default express;
