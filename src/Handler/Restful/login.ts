import { Router }			from "express";
import { iRestHandler }		from "../../Sys/interfaces";
import HandlerUtility		from '../../Sys/HandlerUtility';
import SessionController	from '../../Controller/Session';
// only for debugging
// import Debug from '../../Sys/Debug';

/* login Handler Class */
class loginHandler extends HandlerUtility implements iRestHandler{

	/**
	* Mandatory Properties Description
	* name:		this Handler's Name
	* path:		the path that this handlerClass will manage
	* router:	the ExpressRouter itself to fill
	*/
	name:string		= 'login';
	path:string		= `/api/v1/${this.name}`;
	router:Router	= Router();

	constructor(){
		// execute parent constructor
		super();

		// Attach handlers to express Router
		this.router
		.post( "/", this.postHandler.bind( this ) )
		;
	}

	get controller(){
		return new SessionController;
	}

	postHandler(...args:any[]):any{
		this.middlewareParams = args;
		this.httpMethodOverride('LOGIN');
		let params:any = this.getRequestParams('body');

		return this.controller
		.createAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}
}

export default new loginHandler;
