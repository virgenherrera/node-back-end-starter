// only for debugging
// import Debug from '../../Sys/Debug';
import {
	Router,
	Request,
	Response
}						from "express";
import { iHandler }		from "../../Sys/interfaces";
import HandlerUtility 	from '../../Sys/HandlerUtility';

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
		this.router.get("/", this.mainView.bind(this));
	}

	mainView(req:Request,res:Response){
		this.middlewareParams = arguments;

		return res.render('index',{title:'Express Js'});
	}
}

export default new mainHandler;
