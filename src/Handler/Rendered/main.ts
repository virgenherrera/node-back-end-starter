import {Router, Request, Response} from "express";
import {iHandler}		from "../iHandler";
import HandlerUtility 	from '../../Sys/HandlerUtility';

/* HandlerFoo Router Class */
class HandlerFoo  extends HandlerUtility implements iHandler{

	name	: string;
	path	: string;
	router	: Router;

	constructor(){
		// execute parent constructor
		super();

		// the properties to export
		this.name = 'main';
		this.path = "/";
		this.router = Router();

		this.init();
	}

	init():void{
		this.router.get( "/",this.mainView.bind(this));
	}

	mainView(req:Request,res:Response){
		this.middlewareParams = arguments;

		return res.render('index',{title:'Express Js'});
	}
}

export default new HandlerFoo;
