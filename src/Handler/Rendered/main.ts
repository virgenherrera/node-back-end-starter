import { Router }		from "express";
import { iHandler }		from "../../Sys/interfaces";
import HandlerUtility 	from '../../Sys/HandlerUtility';
// only for debugging
// import Debug from '../../Sys/Debug';

/* mainHandler Router Class */
class mainHandler extends HandlerUtility implements iHandler{

	/**
	* Mandatory Properties Description
	* name: 	this Handler Name
	* path: 	the path that handles this class
	* router: 	the ExpressRouter itself to fill
	*/
	name:string		= 'main';
	path:string		= "/";
	router:Router	= Router();

	constructor(){
		// execute parent constructor
		super();

		// Attach handlers to express Router
		this.router
		.get("/", this.mainView.bind(this));
	}

	mainView(...args:any[]):any{
		this.middlewareParams = args;

		return this.Response.render('index',{title:'Express Js'});
	}
}

export default new mainHandler;
