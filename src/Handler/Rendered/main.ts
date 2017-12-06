import { Router, Request, Response, NextFunction } from 'express';
import { IHandler } from '../../Sys/interfaces';
import HandlerUtility from '../../Sys/HandlerUtility';
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
	name = 'main';
	path = '/';
	router: Router = Router();

	constructor() {
		// Attach handlers to express Router
		this.router
		.get('/', this.mainView.bind(this));
	}

	get handlerUtility( ): HandlerUtility {
		return new HandlerUtility;
	}

	mainView( req: Request, res: Response, next: NextFunction ): any {
		return res.render('index', {title: 'Express Js'});
	}
}

export default new MainHandler;
