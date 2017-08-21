import {Router, Request, Response, NextFunction} from "express";
import Route1Controller			from '../../../Business/Route1';
import ApiRouteUtilities 		from '../../../lib/ApiRouteUtilities';

/* Route1 Router Class */
class routerRoute1  extends ApiRouteUtilities{

	router:Router;

	constructor(){
		// execute parent constructor
		super();

		// the router itself to export
		this.router = Router();

		this.router.get( "/",this.getRoute1s.bind(this));
		this.router.get("/:id",this.getRoute1.bind(this));
		this.router.post("/",this.postRoute1.bind(this));
		this.router.put("/:id",this.putRoute1.bind(this));
		this.router.delete("/:id",this.deleteRoute1.bind(this));
	}

	getRoute1s(req:Request,res:Response,next:NextFunction){
		this.middlewareParams = arguments;
		let params = this.getRequestParams('body,query,decodedToken,orAnyOtherKeyInRequest');
		let ctrl	= new Route1Controller();

		return ctrl.create(params)
		.then( this.getSuccessResponse.bind(this) )
		.catch( this.getErrorResponse.bind(this) );
	}

	getRoute1(req,res,next){
		this.middlewareParams = arguments;
		let params = this.getRequestParams('body,query,decodedToken,orAnyOtherKeyInRequest');
		let ctrl	= new Route1Controller();

		return ctrl.METHOD(params)
		.then( this.getSuccessResponse.bind(this) )
		.catch( this.getErrorResponse.bind(this) );
	}

	postRoute1(req,res,next){
		this.middlewareParams = arguments;
		let params = this.getRequestParams('body,query,decodedToken,orAnyOtherKeyInRequest');
		let ctrl	= new Route1Controller();

		return ctrl.METHOD(params)
		.then( this.postSuccessResponse.bind(this) )
		.catch( this.postErrorResponse.bind(this) );
	}

	putRoute1(req,res,next){
		this.middlewareParams = arguments;
		let params = this.getRequestParams('body,query,decodedToken,orAnyOtherKeyInRequest');
		let ctrl	= new Route1Controller();

		return ctrl.METHOD(params)
		.then( this.putSuccessResponse.bind(this) )
		.catch( this.putErrorResponse.bind(this) );
	}

	deleteRoute1(req,res,next){
		this.middlewareParams = arguments;
		let params = this.getRequestParams('body,query,decodedToken,orAnyOtherKeyInRequest');
		let ctrl	= new Route1Controller();

		return ctrl.METHOD(params)
		.then( this.deleteSuccessResponse.bind(this) )
		.catch( this.deleteErrorResponse.bind(this) );
	}
}

let {router} = new routerRoute1;
module.exports = router;
