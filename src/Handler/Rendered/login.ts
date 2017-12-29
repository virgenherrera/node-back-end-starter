import { Router, Request, Response, NextFunction } from 'express';
import { IHandler } from '../../Sys/interfaces';
import HandlerUtility from '../../Sys/HandlerUtility';
import { SessionController } from '../../Controller/Session';
// only for debugging
// import { dd } from '../../Sys/Debug';

/* mainHandler Router Class */
class MainHandler implements IHandler {

	/**
	* Mandatory Properties Description
	* name: 	this Handler Name
	* path: 	the path that handles this class
	* router: 	the ExpressRouter itself to fill
	*/
	name = 'login';
	path = `/${this.name}`;
	router: Router = Router();

	constructor() {
		// Attach handlers to express Router
		this.router
		.get('/', this.getView.bind(this))
		.post('/', this.postView.bind(this));
	}

	get controller() {
		return new SessionController;
	}

	getView( req: Request, res: Response, next: NextFunction ): any {
		return res.render('login_example', { title: 'Express Js' });
	}

	async postView(req: Request, res: Response, next: NextFunction): Promise<any> {
		const handUtil = new HandlerUtility(req, res, next);
		const params = handUtil.getRequestParams('body');
		let data;

		try {
			data = await this.controller.createAction(params);
			return res.status(200).cookie('token', data).redirect('/');
		} catch (E) {
			return handUtil.ErrorJsonResponse(E);
		}
	}
}

export default new MainHandler;
