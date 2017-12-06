import {Request, Response, NextFunction} from 'express';
import {Error406} from '../Sys/ResponseDto';


// API access allowed only to content-type': 'application/x-www-form-urlencoded except for GET
export default (req: Request, res: Response, next: NextFunction): any => {
	const {method, headers} = req;

	if ( method === 'GET' || ( headers['content-type'] && headers['content-type'] === 'application/x-www-form-urlencoded' ) ) {
		return next();
	} else {
		const e406 = new Error406;
		return res.status(e406.status).json(e406);
	}
};
