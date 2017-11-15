import {Request, Response, NextFunction} from "express";
import {error406} from '../Sys/ResponseDto';


// API access allowed only to content-type': 'application/x-www-form-urlencoded except for GET
export default (req:Request, res:Response, next:NextFunction):any=>{
	let {method,headers} = req;

	if( method == 'GET' || ( headers['content-type'] && headers['content-type'] === 'application/x-www-form-urlencoded' ) ){
		return next();
	} else {
		let e406 = new error406;
		return res.status(e406.status).json(e406);
	}
}
