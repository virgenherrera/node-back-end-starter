
import {Request, Response, NextFunction} from "express";
import {error404} from '../Dto/Error';

export default (req:Request, res:Response, next:NextFunction):Response=>{
	let message = `Not-existent Endpoint '${req.url}' for Method: '${req.method}'`;
	let e404 = new error404(message);

	// set locals, only providing error in development
	res.locals.message = e404.message;
	res.locals.error = (req.app.get('env') === 'development') ? e404 : {};


	// render the error page
	return res.status( e404.status ).json( e404 );
};
