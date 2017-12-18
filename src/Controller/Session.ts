import { sign, verify } from 'jsonwebtoken';
import { validatePassword } from '../Lib/passwordUtil';
import { IcreateAction } from '../Sys/interfaces';
import UserRepository from '../Repository/user';
import User from '../Poco/user';
// only for debugging
// import { dd } from '../Sys/Debug';

/* Session Controller Class */
export default class SessionController implements IcreateAction {
	secret: string	= process.env.JWT_SECRET;
	options: object	= { expiresIn: process.env.JWT_EXPIRATION };

	get repository() {
		return new UserRepository;
	}

	async createAction({email= null, password= null}): Promise<any> {
		const data	= await this.repository.FindOne({email}, 'full');

		if ( !data ) {
			throw new Error(`Non-existent email: ${email}`);
		}
		if ( !validatePassword(password, data.dataValues.password) ) {
			throw new Error(`bad credentials`);
		}

		const { id, role } = new User(data);
		const jwtPayload = {
			id	: id,
			role: role
		};

		return {
			token : sign(jwtPayload, this.secret, this.options)
		};
	}

	async validateAction(token: string): Promise<any> {
		let decodedToken;
		try {
			decodedToken = verify(token, this.secret);
			const Wh = {
				id	: decodedToken.id,
				role: decodedToken.role,
			};
			const data = await this.repository.FindOne(Wh, 'full');

			return new User(data);
		} catch (e) {
			throw e;
		}
	}
}
