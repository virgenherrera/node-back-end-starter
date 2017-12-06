import { Request, Response, NextFunction } from 'express';
import HandlerUtility from '../Sys/HandlerUtility';
import SessionController from '../Controller/Session';
// only for debugging
// import { dd } from '../Sys/Debug';

export default function restJwtAuth( req: Request, res: Response, next: NextFunction ): any {
	const ctrl		= new SessionController;
	const bRegExp	= new RegExp('Bearer ', 'g');
	const rawToken	= getRawToken( req );
	const token		= ( rawToken ) ? rawToken.replace( bRegExp, '') : '';

	return ctrl
	.validateAction( token )
	.then((decodedToken = null) => {
		if ( !decodedToken ) {
			throw new Error('error decoding token');
		}

		req['decodedToken'] = decodedToken;
		return next();
	})
	.catch( E => {
		const handUtil = this.handlerUtility;
		handUtil.middlewareParams = [req, res, next];
		return handUtil.ErrorJsonResponse(E);
	});
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
