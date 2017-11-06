import * as Express			from 'express';
import * as logger			from 'morgan';
import * as bodyParser		from 'body-parser';
import * as cors			from 'cors';
import * as moment			from 'moment';
import * as favicon			from 'serve-favicon';
import * as Handlers		from '../Handler';
import loadEnvironmentVars 	from '../Sys/loadEnvironmentVars';
import Directories 			from '../Sys/Directories';
import mongodbConnection	from '../Sys/mongodbConnection';
import acceptUrlencoded		from '../Middleware/acceptUrlencoded';
import notFound				from '../Middleware/notFound';

/**
* Be sure to execute this App with properly defined ENV
*/
loadEnvironmentVars();

// Create and config a new expressJs web Application
class Application{

	public express: Express.Application;

	constructor(){
		this.express = Express();

		this
		.storageConnect()
		.middleware()
		.viewsConfig()
		.exposePubicPath()
		.exposeRoutes()
		.catch404();
	}

	middleware():this{
		// this.express.use( favicon( `${Directories.Public}/'favicon.ico` ) );
		this.express.use( logger('dev') );
		this.express.use( bodyParser.json() );
		this.express.use( bodyParser.urlencoded({ extended: true }) );
		this.express.use( cors() );
		this.express.use( acceptUrlencoded );

		return this;
	}

	viewsConfig():this{
		// view engine setup
		this.express.set('views', Directories.Views );
		this.express.set('view engine', 'pug');

		return this;
	}

	exposePubicPath():this{
		this.express.use( Express.static( Directories.Public ) );

		return this;
	}

	exposeRoutes(){
		for( let key in Handlers ){
			let {name=null,path=null,router=null} = Handlers[key];

			if( (name) && (path) && (router) ){
				if( path.charAt(0) != '/' ) path = `/${path}`;

				console.log(`exposing route: "${path}"${"\n"}from:	"${key}" handler file${"\n"}`);
				this.express.use( path , router );
			}
		}

		return this;
	}

	catch404():this{
		// catch 404 and handle it
		this.express.use( notFound );

		return this;
	}

	storageConnect():this{
		mongodbConnection().then( msg => console.log(msg) );

		return this;
	}
}

let { express } = new Application;
export default express;
