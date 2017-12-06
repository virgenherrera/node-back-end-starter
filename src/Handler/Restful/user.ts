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
		.delete('/:id', restJwtAuth, this.deleteHandler.bind( this ) )
		;
	}


	get controller() {
		return new UserController;
	}

	async getAllHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('query');
		let data;

		try {
			data = await this.controller.listAction(params);
			return handUtil.SuccessJsonResponse(data);
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);
		}
	}

	async getOneHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('params');
		let data;

		try {
			data = await this.controller.showAction( params );
			return handUtil.SuccessJsonResponse(data);
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);

		}
	}

	async postHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('body');
		let data;

		try {
			data = await this.controller.createAction( params );
			return handUtil.SuccessJsonResponse(data);
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);
		}
	}

	async putHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('params,body');
		let data;

		try {
			data = await this.controller.editAction( params );
			return handUtil.SuccessJsonResponse(data);
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);

		}
	}

	async deleteHandler( req: Request, res: Response, next: NextFunction ): Promise<Response> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('params');
		let data;

		try {
			data = await this.controller.deleteAction( params );
			return handUtil.SuccessJsonResponse(data);
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);
		}
	}
}

export default new UserHandler;
