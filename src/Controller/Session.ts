import { compareSync } from "bcryptjs";
import { sign,verify } from "jsonwebtoken";
import { iController }	from "../Sys/interfaces";
import UserRepository	from "../Repository/user";
import User		from "../Poco/user";
// only for debugging
// import Debug from '../Sys/Debug';

/* Session Controller Class */
export default class SessionController implements iController{
	secret:string	= process.env.JWT_SECRET;
	options:object	= {
		expiresIn: process.env.JWT_EXPIRATION
	};

	get repository(){
		return new UserRepository;
	}

	async createAction(params:any):Promise<any>{
		let {
			email=null,
			password=null,
		} = params;
		let data	= await this.repository.FindOne({email},'email password role');

		if( !data ) throw `Non-existent email: ${email}`;
		if( !compareSync(password,data.password) ) throw `bad credentials`;

		let { _id,role } = new User(data);
		let jwtPayload = {
			id	: _id,
			role: role
		};

		return {
			token	: sign(jwtPayload,this.secret,this.options)
		};
	}

	async validateAction(token:string):Promise<any>{
		let decodedToken;
		try {
			decodedToken = verify(token,this.secret);
		} catch (e) {
			throw e;
		}

		let Wh = {
			_id	: decodedToken.id,
			role: decodedToken.role,
		};
		let data = await this.repository.FindOne(Wh,'email role');

		return new User(data);
	}
}
