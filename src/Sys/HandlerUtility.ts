// import Debug from '../Sys/Debug';
import {Request, Response, NextFunction}			from "express";
import pagination from '../config/pagination';
import {
	Auth,
	Get,
	Post,
	Put,
	Delete,
	error400,
	error401,
	error500
}	from "./ResponseDto";

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

	get Next():NextFunction{
		let { next=null } = this._middlewareParams;
		if ( next ){
			return next;
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

	private getSort():object{
		let {query={}} = this.Request;
		let {sort=''} = query;
		let Res = {};

		let parsed = sort.split(',').forEach((item:string)=>{
			if( !item ) return;
			let order = 'asc';
			if( item.charAt(0) == '-' ){
				order = 'desc';
				item = item.substring(1);
			}

			Res[ item ] = order;
		});

		return Res;
	}

	public getRequestParams(paramString:string|string[]):object{
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
			params.push({ limit: this.limit, offset: this.offset, sort: this.getSort() } )
		}

		return (<any>Object).assign.apply(this,params);
	}

	public httpMethodOverride(method:string):void{
		this._middlewareParams.req.method = method;
	}

	public SuccessJsonResponse(params): Response {
		const { method } = this.Request;
		const Res = this.Response;
		let Data;

		// Sanitize this Request Parameters
		this.Init();

		switch(method){
			case 'GET':
				Data = new Get(params)
				break;
			case 'POST':
				Data = new Post(params)
				break;

			case 'PUT':
				Data = new Put(params);
				break;

			case 'DELETE':
				Data = new Delete(params);
				break;

			case 'LOGIN':
				Data = new Auth(params);
			break;
		}

		return Res.status(Data.status).json(Data);
	}

	public ErrorJsonResponse(params): Response {
		const { method } = this.Request;
		const Res = this.Response;
		const {
			name=null,
			message=null
		} = params;
		let Err;
		if( method == 'LOGIN' || name == 'JsonWebTokenError' ){
			Err = new error401(params)
		}
		else if( message ){
			Err = new error400(params.message)
		} else{
			Err = new error500(params);
		}

		// Sanitize this Request Parameters
		this.Init();

		return Res.status( Err.status ).json( Err );
	}
}
