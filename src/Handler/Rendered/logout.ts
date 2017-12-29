import { Router, Request, Response, NextFunction } from 'express';
import { IHandler } from '../../Sys/interfaces';
import HandlerUtility from '../../Sys/HandlerUtility';
import renderedJwtAuth from '../../Middleware/renderedJwtAuth';
import { SessionController } from '../../Controller/Session';
// only for debugging
// import { dd } from '../../Sys/Debug';

/* mainHandler Router Class */
class LogoutHandler implements IHandler {

	/**
	* Mandatory Properties Description
	* name: 	this Handler Name
	* path: 	the path that handles this class
	* router: 	the ExpressRouter itself to fill
	*/
	name = 'logout';
	path = `/${this.name}`;
	router: Router = Router();

	constructor() {
		// Attach handlers to express Router
		this.router
		.get('/', renderedJwtAuth, this.mainView.bind(this))
		.post('/', renderedJwtAuth, this.mainView.bind(this))
		;
	}

	get controller() {
		return new SessionController;
	}

	async mainView(req: Request, res: Response, next: NextFunction): Promise<any> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('decodedToken');
		let data;

		try {
			data = await this.controller.destroyAction(params);
			return res.status(200).clearCookie('token').redirect('/');
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);
		}
	}
}

export default new LogoutHandler;
