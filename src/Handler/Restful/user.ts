import { Router }		from "express";
import { iRestHandler }	from "../../Sys/interfaces";
import HandlerUtility	from '../../Sys/HandlerUtility';
import UserController	from '../../controller/User';
// only for debugging
// import Debug from '../../Sys/Debug';

/* user Handler Class */
class userHandler extends HandlerUtility implements iRestHandler{

	/**
	* Mandatory Properties Description
	* name: 	this Handler Name
	* path: 	the path that handles this class
	* router: 	the ExpressRouter itself to fill
	*/
	name:string		= 'users';
	path:string		= `/api/${this.name}`;
	router:Router	= Router();

	constructor(){
		// execute parent constructor
		super();

		// Attach handlers to express Router
		this.router.get("/", this.getAllHandler.bind(this));
		this.router.get("/:id", this.getOneHandler.bind(this));
		this.router.post( "/",this.postHandler.bind(this));
		this.router.put("/:id", this.putHandler.bind(this));
		this.router.delete("/:id", this.deleteHandler.bind(this));
	}

	get controller(){
		return new UserController;
	}

	getAllHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('query');

		return this.controller
		.listAction(params)
		.then(this.SuccessResponse.bind(this))
		.catch(this.ErrorResponse.bind(this));
	}

	getOneHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('params');

		return this.controller
		.showAction(params)
		.then(this.SuccessResponse.bind(this) )
		.catch(this.ErrorResponse.bind(this) );
	}

	postHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('body');

		return this.controller
		.createAction(params)
		.then(this.SuccessResponse.bind(this))
		.catch(this.ErrorResponse.bind(this));
	}

	putHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('params,body');

		return this.controller
		.editAction(params)
		.then(this.SuccessResponse.bind(this))
		.catch(this.ErrorResponse.bind(this));
	}

	deleteHandler(...args:any[]):any{
		this.middlewareParams = args;
		let params:any = this.getRequestParams('params');

		return this.controller
		.deleteAction(params)
		.then(this.SuccessResponse.bind(this))
		.catch(this.ErrorResponse.bind(this));
	}
}

export default new userHandler;
