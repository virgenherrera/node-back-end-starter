import {Request, Response, NextFunction}			from "express";
import {authDto,getDto,postDto,putDto,deleteDto}	from "../dto/Restful";
import {error401,error404,error500}					from "../Dto/Error";

const Defaults = {
	limit:50,
	offset:0,
};

interface iMiddlewareParams{
	req		: Request;
	res		: Response;
	next	: NextFunction;
}


export default class ApiRouteUtilities{

	_middlewareParams:iMiddlewareParams;
	_limit:number;
	_offset:number;

	constructor(){
		this.Init();
	}

	set middlewareParams([req,res,next]){
		this._middlewareParams.req	= req;
		this._middlewareParams.res	= res;
		this._middlewareParams.next	= next;

		if( req.query && req.query.limit ) this.limit = req.query.limit;
		if( req.query && req.query.offset ) this.offset = req.query.offset;
		if( req.body && req.body.limit ) this.limit = req.body.limit;
		if( req.body && req.body.offset ) this.offset = req.body.offset;
	}

	set limit(limit:number){
		if( typeof limit === 'number' || ( typeof limit === 'string' && /^\d+$/.test( limit ) ) ){
			// parse int
			limit = Number(limit);
			// allow MAX limit to defined in constants file
			this._limit = ( limit > 0 && limit < Defaults.limit ) ? limit : Defaults.limit;
		}
	}

	set offset(offset:number){
		if( typeof offset === 'number' || ( typeof offset === 'string' && /^\d+$/.test( offset ) ) ){
			// parse int
			offset = Number(offset);
			// offset must be Major than 0
			this._offset = ( offset > 0 ) ? offset : Defaults.offset;
		}
	}

	get expressResponse():Response{
		if( (this._middlewareParams.res) && typeof this._middlewareParams.res === 'object' ){
			return this._middlewareParams.res;
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
		this.limit	= Defaults.limit;
		this.offset	= Defaults.offset;
	}

	public getRequestParams(paramString:string):Object{
		let params = [{},{limit:this.limit,offset:this.offset}];
		let reqParamsArr = paramString
			.split(',')
			.map((p) =>{
				if( p in this._middlewareParams.req ){
					return  ( typeof this._middlewareParams.req[p] == 'object' ) ? this._middlewareParams.req[p] : { [p] : this._middlewareParams.req[p] };
				}
			})
		params = params.concat( reqParamsArr );

		return Object.assign.apply(this,params);
	}

	public getSuccessResponse(params):Response{
		let Res = new getDto(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public getErrorResponse(params):Response{
		let Res = new error404(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public postSuccessResponse(params):Response{
		let Res = new postDto(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public postErrorResponse(params):Response{
		let Res = new error500(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public putSuccessResponse(params):Response{
		let Res = new putDto(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public putErrorResponse(params):Response{
		let Res = new error500(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public deleteSuccessResponse(params):Response{
		let Res = new deleteDto(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public deleteErrorResponse(params):Response{
		let Res = new error500(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public authSuccessResponse(params):Response{
		let Res	= new authDto(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}

	public authErrorResponse(params):Response{
		let Res = new error401(params);

		this.Init();

		return this.expressResponse.status( Res.status ).json( Res );
	}
}
