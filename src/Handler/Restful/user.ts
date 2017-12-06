import { Router, Request, Response, NextFunction } from 'express';
import { IRestFull } from '../../Sys/interfaces';
import { plural } from 'pluralize';
import HandlerUtility from '../../Sys/HandlerUtility';
import restJwtAuth from '../../Middleware/restJwtAuth';
import UserController from '../../Controller/User';
// only for debugging
// import { dd } from '../../Sys/Debug';

/* user Handler Class */
class UserHandler implements IRestFull {

	/**
	* Mandatory Properties Description
	* name:		this Handler's Name
	* path:		the path that this handlerClass will manage
	* router:	the ExpressRouter itself to fill
	*/
	name = 'user';
	path = `/api/v1/${plural(this.name)}`;
	router: Router = Router();

	constructor() {
		// Attach handlers to express Router
		this.router
		.get('/', restJwtAuth, this.getAllHandler.bind( this ) )
		.get('/:id', restJwtAuth, this.getOneHandler.bind( this ) )
		.post( '/', restJwtAuth, this.postHandler.bind( this ) )
		.put('/:id', restJwtAuth, this.putHandler.bind( this ) )
		.delete('/:id', restJwtAuth, this.deleteHandler.bind( this ) );
	}


	get controller() {
		return new UserController;
	}

	get handlerUtility( ): HandlerUtility {
		return new HandlerUtility;
	}

	getAllHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = this.handlerUtility;
		handUtil.middlewareParams = [req, res, next];
		const params = handUtil.getRequestParams('query');

		return this
		.controller
		.listAction(params)
		.then( handUtil.SuccessJsonResponse.bind( handUtil ) )
		.catch( handUtil.ErrorJsonResponse.bind( handUtil ) );
	}

	getOneHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = this.handlerUtility;
		handUtil.middlewareParams = [req, res, next];
		const params = handUtil.getRequestParams('params');

		return this
		.controller
		.showAction( params )
		.then( handUtil.SuccessJsonResponse.bind( handUtil ) )
		.catch( handUtil.ErrorJsonResponse.bind( handUtil ) );
	}

	postHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = this.handlerUtility;
		handUtil.middlewareParams = [req, res, next];
		const params = handUtil.getRequestParams('body');

		return this
		.controller
		.createAction( params )
		.then( handUtil.SuccessJsonResponse.bind( handUtil ) )
		.catch( handUtil.ErrorJsonResponse.bind( handUtil ) );
	}

	putHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = this.handlerUtility;
		handUtil.middlewareParams = [req, res, next];
		const params = handUtil.getRequestParams('params,body');

		return this
		.controller
		.editAction( params )
		.then( handUtil.SuccessJsonResponse.bind( handUtil ) )
		.catch( handUtil.ErrorJsonResponse.bind( handUtil ) );
	}

	deleteHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = this.handlerUtility;
		handUtil.middlewareParams = [req, res, next];
		const params:  any = handUtil.getRequestParams('params');

		return this
		.controller
		.deleteAction( params )
		.then( handUtil.SuccessJsonResponse.bind( handUtil ) )
		.catch( handUtil.ErrorJsonResponse.bind( handUtil ) );
	}
}

export default new UserHandler;
