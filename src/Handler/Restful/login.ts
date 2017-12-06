import { Router, Request, Response, NextFunction } from 'express';
import { IpostHandler } from '../../Sys/interfaces';
import HandlerUtility from '../../Sys/HandlerUtility';
import SessionController from '../../Controller/Session';
// only for debugging
// import { dd } from '../../Sys/Debug';

/* login Handler Class */
class LoginHandler extends HandlerUtility implements IpostHandler {

	/**
	* Mandatory Properties Description
	* name:		this Handler's Name
	* path:		the path that this handlerClass will manage
	* router:	the ExpressRouter itself to fill
	*/
	name = 'login';
	path = `/api/v1/${this.name}`;
	router: Router	= Router();

	constructor() {
		// execute parent constructor
		super();

		// Attach handlers to express Router
		this.router
		.post( '/', this.postHandler.bind( this ) )
		;
	}

	get controller() {
		return new SessionController;
	}

	postHandler( req: Request, res: Response, next: NextFunction ): any {
		this.middlewareParams = [req, res, next];
		this.httpMethodOverride('LOGIN');
		const params: any = this.getRequestParams('query');

		return this
		.controller
		.createAction( params )
		.then( this.SuccessJsonResponse.bind( this ) )
		.catch( this.ErrorJsonResponse.bind( this ) );
	}
}

export default new LoginHandler;
