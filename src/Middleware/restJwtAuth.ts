import { Request, Response, NextFunction } from 'express';
import HandlerUtility from '../Sys/HandlerUtility';
import SessionController from '../Controller/Session';
// only for debugging
// import { dd } from '../Sys/Debug';

export default async function restJwtAuth( req: Request, res: Response, next: NextFunction ): Promise<any> {
	const handUtil = new HandlerUtility(req, res, next);
	const ctrl		= new SessionController;
	const bRegExp	= new RegExp('Bearer ', 'g');
	const rawToken	= getRawToken( req );
	const token		= ( rawToken ) ? rawToken.replace( bRegExp, '') : '';

	try {
		const decodedToken = await ctrl.validateAction( token );
		req['decodedToken'] = decodedToken;
		return next();
	} catch (E) {
		return handUtil.ErrorJsonResponse(E);
	}
}

function getRawToken( req: Request ): string {
	const rawToken	=
	req.body.token ||
	req.query.token ||
	req.headers.token ||
	req.headers['authorization'] ||
	req.headers['JWT'] ||
	req.headers['jwt'];

	return rawToken;
}
