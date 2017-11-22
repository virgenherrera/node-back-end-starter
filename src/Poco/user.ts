import { iUser } from '../Model/user';
// only for debugging
// import Debug from '../Sys/Debug';

export default class User implements iUser{
	_id				: string;
	firstName		: string;
	lastName		: string;
	email			: string;
	password		: string;
	role			: string;
	rememberToken	: string;

	constructor(params=null){
		if(params){
			if( params._id )			this._id = params._id;
			if( params.firstName )		this.firstName = params.firstName;
			if( params.lastName )		this.lastName = params.lastName;
			if( params.email )			this.email = params.email;
			if( params.password )		this.password = params.password;
			if( params.role )			this.role = params.role;
			if( params.rememberToken )	this.rememberToken = params.rememberToken;
		}
	}
}
