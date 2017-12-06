import { IUser } from '../Model/user';
// only for debugging
// import { dd } from '../Sys/Debug';

export default class User implements IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	rememberToken: string;

	constructor(params= null) {
		this._id = params._id;
		this.firstName = params.firstName;
		this.lastName = params.lastName;
		this.email = params.email;
		this.password = params.password;
		this.role = params.role;
		this.rememberToken = params.rememberToken;
	}
}
