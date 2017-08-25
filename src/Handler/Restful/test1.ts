import {Router, Request, Response, NextFunction} from "express";
import {iHandler}		from "../iHandler";
import HandlerUtility 	from '../../lib/HandlerUtility';

/* HandlerFoo Router Class */
class HandlerFoo  extends HandlerUtility implements iHandler{

	name	: string;
	path	: string;
	router	: Router;

	constructor(){
		// execute parent constructor
		super();

		// the properties to export
		this.name = 'helloworld';
		this.path = `/api/${this.name}`;
		this.router = Router();

		this.init();
	}

	init():void{
		this.router.get( "/",this.getHandlerFoos.bind(this));
	}

	getHandlerFoos(req:Request,res:Response,next:NextFunction){
		this.middlewareParams = arguments;
		let params = this.getRequestParams('body,query,params,clientIp');
		// let ctrl	= new HandlerFooController();

		// return ctrl.create(params)
		// .then( this.getSuccessResponse.bind(this) )
		// .catch( this.getErrorResponse.bind(this) );

		// return this.getSuccessResponse(params);

		return res.status(200).json(params)
	}
}

export default new HandlerFoo;
