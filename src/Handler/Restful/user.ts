import { Router }			from "express";
import { plural }			from 'pluralize';
import { iRestHandler }		from "../../Sys/interfaces";
import HandlerUtility		from '../../Sys/HandlerUtility';
import restJwtAuth			from '../../Middleware/restJwtAuth';
import UserController		from '../../Controller/User';
// only for debugging
// import Debug from '../../Sys/Debug';

/* user Handler Class */
class userHandler extends HandlerUtility implements iRestHandler{

	/**
	* Mandatory Properties Description
	* name:		this Handler's Name
	* path:		the path that this handlerClass will manage
	* router:	the ExpressRouter itself to fill
	*/
	name:string		= 'user';
	path:string		= `/api/v1/${plural(this.name)}`;
	router:Router	= Router();

	constructor(){
		// execute parent constructor
		super();

		// Attach handlers to express Router
		this.router
		.get("/", restJwtAuth, this.getAllHandler.bind( this ) )
		.get("/:id", restJwtAuth, this.getOneHandler.bind( this ) )
		.post( "/", restJwtAuth, this.postHandler.bind( this ) )
		.put("/:id", restJwtAuth, this.putHandler.bind( this ) )
		.delete("/:id", restJwtAuth, this.deleteHandler.bind( this ) );
	}

	get controller(){
		return new UserController;
	}

	getAllHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('query');

		return this.controller
		.listAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}

	getOneHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('params');

		return this.controller
		.showAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}

	postHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('body');

		return this.controller
		.createAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}

	putHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('params,body');

		return this.controller
		.editAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}

	deleteHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('params');

		return this.controller
		.deleteAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}
}

export default new userHandler;
