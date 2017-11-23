import {
	Request,
	Response,
	NextFunction
}							from "express";
import HandlerUtility		from '../Sys/HandlerUtility';
import SessionController	from '../Controller/Session';
// only for debugging
// import Debug from '../Sys/Debug';

export default function JwtAuth(req:Request,res:Response,next:NextFunction):any{
	const ctrl		= new SessionController;
	const bRegExp	= new RegExp("Bearer ","g");
	const util		= new HandlerUtility;
	util.middlewareParams = [req,res,next];

	let token = req.body.token || req.query.token || req.headers['authorization'] || req.headers['JWT'] || req.headers['jwt'];
	token = (token) ? token.replace(bRegExp,'') : '';

	return ctrl
	.validateAction( token )
	.then((decodedToken=null)=>{
		if( !decodedToken ) throw "error decoding token";

		req['decodedToken'] = decodedToken;
		return next();
	})
	.catch( E => util.ErrorJsonResponse(E) );
}
