import { Router, Request, Response, NextFunction } from 'express';
import { IpostHandler } from '../../Sys/interfaces';
import HandlerUtility from '../../Sys/HandlerUtility';
import SessionController from '../../Controller/Session';
// only for debugging
import { dd } from '../../Sys/Debug';

/* login Handler Class */
class LoginHandler implements IpostHandler {

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

		// Attach handlers to express Router
		this.router
		.post( '/', this.postHandler.bind( this ) )
		;
	}

	get controller() {
		return new SessionController;
	}

	async postHandler( req: Request, res: Response, next: NextFunction ): Promise<any> {
		const handUtil = new HandlerUtility(req, res, next);
		const params: any = handUtil.getRequestParams('body');
		let data;

		try {
			data = await this.controller.createAction( params );
			return handUtil.SuccessJsonResponse(data);
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);
		}
	}
}

export default new LoginHandler;
