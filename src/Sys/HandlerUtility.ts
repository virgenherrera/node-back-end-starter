import Debug from '../Sys/Debug';
import {Request, Response, NextFunction}			from "express";
import pagination from '../config/pagination';
import {
	authDto,
	getDto,
	postDto,
	putDto,
	deleteDto,
	error401,
	error404,
	error500
}	from "../dto/Restful";

export default class HandlerUtility{

	_middlewareParams:{
		req		: Request;
		res		: Response;
		next	: NextFunction;
	};
	_limit:number;
	_offset:number;

	constructor(){
		this.Init();
	}

	set middlewareParams([req,res,next]){
		this._middlewareParams.req	= req;
		this._middlewareParams.res	= res;
		this._middlewareParams.next	= next;

		// set limit AND offset from query
		if( req.query && req.query.limit )	this.limit = req.query.limit;
		if( req.query && req.query.offset )	this.offset = req.query.offset;
	}

	set limit(limit:number){
		if( typeof limit === 'number' || ( typeof limit === 'string' && /^\d+$/.test( limit ) ) ){
			// parse int
			limit = Number(limit);
			// allow MAX limit to defined in constants file
			this._limit = ( limit > 0 && limit < pagination.limit ) ? limit : pagination.limit;
		}
	}

	set offset(offset:number){
		if( typeof offset === 'number' || ( typeof offset === 'string' && /^\d+$/.test( offset ) ) ){
			// parse int
			offset = Number(offset);
			// offset must be Major than 0
			this._offset = ( offset > 0 ) ? offset : pagination.offset;
		}
	}

	get Request(): Request {
		let { req = null } = this._middlewareParams;
		if (req) {
			return req;
		}

		throw 'you forgot to provide this.middlewareParams with an express Middleware parameters Response e.g.	"this.middlewareParams = arguments;"';
	}

	get Response():Response{
		let { res=null } = this._middlewareParams;
		if ( res ){
			return res;
		}

		throw 'you forgot to provide this.middlewareParams with an express Middleware parameters Response e.g.	"this.middlewareParams = arguments;"';
	}

	get limit():number{
		return Number( this._limit );
	}

	get offset():number{
		return Number( this._offset );
	}

	private Init():void{
		// reset class Props to Default
		this._middlewareParams = {
			req		: null,
			res		: null,
			next	: null,
		};
		this.limit	= pagination.limit
		this.offset	= pagination.offset;
	}

	public getRequestParams(paramString:string|string[]):Object{
		let Req = this.Request;
		let params = [];

		if( typeof paramString == 'string' ){
			paramString = paramString.split(',');
		}

		let reqParamsArr = paramString
		.map((p) =>{
			if( p in Req ){
				return ( typeof Req[p] == 'object' ) ? Req[p] : { [p] : Req[p] };
			}
		})
		params = params.concat( reqParamsArr );
		if( Req.method == 'GET' ){
			params.push({ limit: this.limit, offset: this.offset } )
		}
		return (<any>Object).assign.apply(this,params);
	}

	public authSuccessResponse(params):Response{
		let Res		= this.Response;
		let Data	= new authDto(params);

		// Sanitize this Request Parameters
		this.Init();

		return Res.status( Data.status ).json( Data );
	}

	public authErrorResponse(params):Response{
		let Res		= this.Response;
		let Data	= new error401(params);

		// Sanitize this Request Parameters
		this.Init();

		return Res.status( Data.status ).json( Data );
	}

	public SuccessResponse(params): Response {
		let { method } = this.Request;
		let Res = this.Response;
		let Data;

		// Sanitize this Request Parameters
		this.Init();

		switch(method){
			case 'GET':
				Data = new getDto(params)
				break;
			case 'POST':
				Data = new postDto(params)
				break;

			case 'PUT':
				Data = new putDto(params);
				break;

			case 'DELETE':
				Data = new deleteDto(params);
				break;
		}

		return Res.status(Data.status).json(Data);
	}

	public ErrorResponse(params): Response {
		let { method } = this.Request;
		let Res = this.Response;
		let Err;

		// Sanitize this Request Parameters
		this.Init();

		switch (method) {
			case 'GET':
				Err = new error404(params);
				break;

			case 'POST':
				Err = new error500(params);
				break;

			case 'PUT':
				Err = new error500(params);
				break;

			case 'DELETE':
				Err = new error500(params);
				break;
		}

		return Res.status( Err.status ).json( Err );
	}
}
